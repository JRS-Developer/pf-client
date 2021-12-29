import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from "@mui/lab/LoadingButton";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Close, Save } from '@mui/icons-material';
import { getMatriculas as listMatriculas, createMatricula, modifiedMatricula } from "../../actions/matricula";
import { getStudents as listStudents } from "../../actions/student";
import { getClases as listClases } from "../../actions/clase"
import { getCicloElectivos as listCicloElectivos } from "../../actions/cicloElectivo"
import { getSchools as listSchools } from "../../actions/school"
import { AutocompleteDiv } from "./MatriculaStyles";
import Autocomplete from "@mui/material/Autocomplete";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'


const MatriculaForm =  ({open, handleClose, titleForm, dataForm, handleClickMessage}) => {
  const [rowMatricula, setRowMatricula] = useState(dataForm);
  //console.log(dataForm)

  const dispatch = useDispatch();

  const getStatusReducer = useSelector(state => state.matriculaReducer);
  const { loading } = getStatusReducer;

  const getStudents = useSelector( state => state.studentReducer )
  const { students/* , loadingStudent */ } = getStudents;

  const getClases = useSelector( state => state.clasesReducer )
  const { clases/* , loadingClases  */} = getClases

  const getCicloElectivos = useSelector( state => state.cicloElectivoReducer );
  const {cicloElectivos/* , loadingElectivo */ } = getCicloElectivos

  const getSchools = useSelector(state => state.schoolReducer);
  const { loadingSchool, schools } = getSchools;

  useEffect( () => {
    const role = {role_id: '5d3709ba-3a27-48cc-8a75-256338684cee'};
    dispatch(listStudents(role))
    dispatch(listClases())
    dispatch(listCicloElectivos())
    dispatch(listSchools())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listamos Los estudiantes
  let listaStudents = [];
  students?.map(student => {
    return listaStudents.push({
      id: student.id,
      label: `${student.identification} - ${student.firstName} ${student.lastName}`
    });
  })
  const initialStudent = {
    id: dataForm?.user?.id,
    label: `${dataForm?.user?.identification} - ${dataForm?.user?.firstName} ${dataForm?.user?.lastName}`
  }
  const [valueStudent, setValueStudent] = useState(dataForm?.id && initialStudent);

  // Listamos Las clases
  let listaClases = [];
  clases?.map(clase => {
    return listaClases.push({
      id: clase.id,
      label: clase.name
    });
  })

  const initialClase = {
    id: dataForm?.class?.id,
    label: dataForm?.class?.name
  }
  const [valueClase, setValueClase] = useState(dataForm?.id && initialClase);

  // Listamos Los ciclos electivos
  let listaElectivos = [];
  cicloElectivos?.map(electivo => {
    return listaElectivos.push({
      id: electivo.id,
      label: electivo.name
    });
  })

  const initialElectivo = {
    id: dataForm?.ciclo_electivo?.id,
    label: dataForm?.ciclo_electivo?.name
  }
  const [valueElectivo, setValueElectivo] = useState(dataForm?.id && initialElectivo);
  
  // Listamos Los colegios
  let listaSchools = [];
  let initialSchool = '';

  schools?.map(school => {
    listaSchools.push({
      id: school.id,
      label: school.name
    });

    if( dataForm?.school_id ===  school.id){
      initialSchool = {
        id: school.id,
        label: school.name
      }
    }
  })

  const [valueSchool, setValueSchool] = useState(dataForm?.id && initialSchool);

  const handleDateChange = (value) => {
    setRowMatricula((input) => ({ ...input, fecha: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(rowMatricula.id){
      await dispatch(modifiedMatricula(rowMatricula))
    }else{
      await dispatch(createMatricula(rowMatricula));
    }

    //Iniciamos la alerta de la respuesta
    handleClickMessage();
    //Listamos los módulos actualizados o nuevos
    dispatch(listMatriculas());
    //Cerramos el modal del formulario
    handleClose();

  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`sm`}
        fullWidth={`sm`}
        scroll='paper'
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm} Matrícula</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <Box sx={{ flexGrow: 1 }}>
              <TextField id="outlined-basic" name="id" variant="standard" type="hidden" value={rowMatricula.id}/>
              <Grid container spacing={2}>
                <Grid item xs={12}>

                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                      fullWidth
                      sx={{ mr: 2, width: '100%' }}
                      value={rowMatricula.fecha}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          sx={{ mr: 2, width: '100%' }}
                          {...params}
                          name="fecha"
                          id="date"
                          label="Fecha"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>

                </Grid>
                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      value={valueSchool}
                      onChange={(event, newValue) => {
                        setValueSchool(newValue);
                        setRowMatricula({
                          ...rowMatricula, 'school_id': newValue?.id
                        })
                      }}
                      inputValue={valueSchool?.label}
                      id="school_id"
                      options={listaSchools}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Escuela" />}
                    />
                  </AutocompleteDiv>
                </Grid>

                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      value={valueStudent}
                      onChange={(event, newValue) => {
                        setValueStudent(newValue);
                        setRowMatricula({
                          ...rowMatricula, 'student_id': newValue?.id
                        })
                      }}
                      inputValue={valueStudent?.label}
                      id="student_id"
                      options={listaStudents}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Alumno" />}
                    />
                  </AutocompleteDiv>
                </Grid>
                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      value={valueClase}
                      onChange={(event, newValue) => {
                        setValueClase(newValue);
                        setRowMatricula({
                          ...rowMatricula, 'clase_id': newValue?.id
                        })
                      }}
                      inputValue={valueClase?.label}
                      id="clase_id"
                      options={listaClases}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Clase" />}
                    />
                  </AutocompleteDiv>
                </Grid>
                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      value={valueElectivo}
                      onChange={(event, newValue) => {
                        setValueElectivo(newValue);
                        setRowMatricula({
                          ...rowMatricula, 'ciclo_lectivo_id': newValue?.id
                        })
                      }}
                      inputValue={valueElectivo?.label}
                      id="ciclo_lectivo_id"
                      options={listaElectivos}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Ciclo Lectivo" />}
                    />
                  </AutocompleteDiv>
                </Grid>
              </Grid>
            </Box>

          </DialogContent>
          <DialogActions>
            {!loading ?
              <>
                <Button type="submit" variant="contained" endIcon={<Save />}>Save</Button>
                <Button variant="outlined" onClick={handleClose} startIcon={<Close />}>Cancel</Button>
              </>
              : <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<Save />}
                variant="outlined"
              >
                Save
              </LoadingButton>}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default MatriculaForm
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Close, Save } from '@mui/icons-material';

import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

import { getTeachers as listTeachers, modifiedTeacher, createTeacher, getTeacherMaterias } from "../../actions/teacher";
import { getClases as listClases } from "../../actions/clase"
import { getCicloElectivos as listCicloElectivos } from "../../actions/cicloElectivo";
import {AutocompleteDiv} from "../matricula/MatriculaStyles";
import Autocomplete from "@mui/material/Autocomplete";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const TeacherForm =  ({open, handleClose, titleForm, dataForm, handleClickMessage}) => {
  const [rowTeacher, setRowTeacher] = useState({
    teacher_id: dataForm.id,
    school_id: '',
    clase_id: '',
    materia_id: '',
    ciclo_lectivo_id: ''
  });

  const dispatch = useDispatch();

  const getTeachers = useSelector(state => state.teacherReducer);
  const { loading } = getTeachers;

  const [checked, setChecked] = useState([]);
  //const [left, setLeft] = useState([0, 1, 2, 3]);
  //const [right, setRight] = useState([4, 5, 6, 7]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const getClases = useSelector( state => state.clasesReducer )
  const { clases, loadingClases  } = getClases

  const obtenerMateriasTeacher = useSelector( state => state.teacherReducer )
  const { teacherMaterias, loadingTeacher  } = obtenerMateriasTeacher

  const obtenerCiclo = useSelector( state => state.cicloElectivoReducer )
  const { cicloElectivos } = obtenerCiclo

  useEffect(() => {
    dispatch(listClases());
    dispatch(listCicloElectivos());
  }, []);

  // Listamos Las clases
  let listaClases = [];
  let initialClase = '';
  clases?.map((clase, index) => {
    listaClases.push({
      id: clase.id,
      label: `${clase.name} - ${clase.school}`,
      school_id: clase.school_id,
      materias: clase.materias
    });

    if(index === 0){
      initialClase = {
        id: clase.id,
        label: `${clase.name} - ${clase.school}`,
        school_id: clase.school_id,
        materias: clase.materias
      }
    }

  })

  const [valueClase, setValueClase] = useState(initialClase);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 250,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const handleChange = (e) => {
    setRowTeacher({
      ...rowTeacher, [e.target.name]: e.target.value
    })
  }

  const getMateriasTeacher = async (body) => {
    await dispatch(getTeacherMaterias(body))
    loadingTeacher ? console.log('loading...') : console.log(teacherMaterias)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(rowTeacher.id){
      await dispatch(modifiedTeacher(rowTeacher))
    }else{
      await dispatch(createTeacher(rowTeacher));
    }
    //Cerramos el formulario
    handleClose()
    // Iniciamos el mensaje de respuesta
    handleClickMessage()
    //Listamos las Teachers
    dispatch(listTeachers());
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`md`}
        fullWidth={`md`}
        scroll='paper'
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm} Teacher, Asignar Materias</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <Box sx={{ flexGrow: 1 }}>
              <TextField id="id" name="id" variant="standard" type="hidden" value={rowTeacher.id}/>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      value={valueClase}
                      onChange={ async (event, newValue) => {
                        setValueClase(newValue);
                        setLeft(newValue?.materias)
                        setRowTeacher({
                          ...rowTeacher, 'clase_id': newValue?.id, 'school_id': newValue?.school_id
                        })

                        await getMateriasTeacher({
                          school_id: newValue?.school_id,
                          clase_id: newValue?.id,
                          teacher_id: dataForm?.id
                        })

                      }}
                      inputValue={valueClase?.label}
                      id="clase_id"
                      options={listaClases}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Clase" />}
                    /><br/>
                  </AutocompleteDiv>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  <Grid item>{customList('Materias', left)}</Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                      >
                        &gt;
                      </Button>
                      <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                      >
                        &lt;
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>{customList('Materias Asignadas', right)}</Grid>
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

export default TeacherForm
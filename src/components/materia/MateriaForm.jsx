import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from "@mui/lab/LoadingButton";
import { Close, Save } from '@mui/icons-material';
import { AutocompleteDiv, TextareaDiv } from "./MateriaStyles";

import { getMaterias as listMaterias, createMateria, modifiedMateria } from "../../actions/materia";
import { getClases as listClases } from "../../actions/clase"
import Autocomplete from "@mui/material/Autocomplete";

const MateriaForm =  ({open, handleClose, titleForm, dataForm, handleClickMessage}) => {
  if(dataForm){
    dataForm.clase_ids = [];
  }

  let defaultValue = [];

  dataForm?.classes?.map(ac => {
    let ob = {};
    ob.name = ac.name;
    ob.clase_id = ac.id;
    defaultValue.push(ob);

    dataForm.clase_ids.push(ac.id)
  });

  const [rowMateria, setRowMateria] = useState(dataForm);

  const dispatch = useDispatch();

  const getStatusReducer = useSelector(state => state.materiasReducer);
  const { loadingMaterias, message, error } = getStatusReducer;

  const getClases = useSelector(state => state.clasesReducer);
  const { clases } = getClases;

  useEffect(() => {
    dispatch(listClases())
  },[])

  //Listamos las clases
  let arrayClases = [];
  clases?.map(clase => {
    let obj = {}
    obj.name = clase.name
    obj.clase_id = clase.id
    arrayClases.push(obj)
  })

  const handleChange = (e) => {
    setRowMateria({
      ...rowMateria, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(rowMateria.id){
      await dispatch(modifiedMateria(rowMateria))
    }else{
      await dispatch(createMateria(rowMateria));
    }

    //Iniciamos la alerta de la respuesta
    handleClickMessage();
    //Listamos los módulos actualizados o nuevos
    dispatch(listMaterias());
    //Cerramos el modal del formulario
    handleClose();

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
          <DialogTitle>{titleForm} Materia</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <Box sx={{ flexGrow: 1 }}>
              <TextField id="outlined-basic" name="id" variant="standard" type="hidden" value={rowMateria.id}/>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    value={rowMateria.name}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextareaDiv>
                    <TextField
                      id="description"
                      name="description"
                      label="Descripción"
                      multiline
                      rows={2}
                      value={rowMateria.description}
                      onChange={handleChange}
                      fullWidth={true}
                    />
                  </TextareaDiv>
                </Grid>
                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      multiple
                      id="actions"
                      options={arrayClases.filter((option) => option.name)}
                      getOptionLabel={(option) => option?.name}
                      defaultValue={defaultValue}
                      filterSelectedOptions
                      onChange={(event, newValue)=> {
                        //console.log(newValue);
                        let clasesIds = []
                        newValue.map((opt) => {
                          clasesIds.push(opt.clase_id)
                        })

                        setRowMateria({
                          ...rowMateria, ['clase_ids']: clasesIds
                        })
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Clases"
                          placeholder="Clases"
                        />
                      )}
                    />
                  </AutocompleteDiv>
                </Grid>
              </Grid>
            </Box>

          </DialogContent>
          <DialogActions>
            {!loadingMaterias ?
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

export default MateriaForm
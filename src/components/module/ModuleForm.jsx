import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Close, Save } from '@mui/icons-material';
import LoadingButton from "@mui/lab/LoadingButton";
import {AutocompleteDiv} from './ModuleStyles';
import { getModules as listModules, createModule, modifiedModule } from "../../actions/module";
import { getActions as listaActions } from "../../actions/action";


const ModuleForm =  ({open, handleClose, titleForm, dataForm, handleClickMessage}) => {
  if(dataForm){
    dataForm.action_id = [];
  }

  let defaultValue = [];

  dataForm?.actions?.map(ac => {
    let ob = {};
    ob.name = ac.name;
    ob.action_id = ac.id;
    defaultValue.push(ob);
    dataForm.action_id.push(ac.id)
  });

  const [rowModule, setRowModule] = useState(dataForm);

  const dispatch = useDispatch();

  const getModules = useSelector(state => state.modulesReducer);
  const { modules, loading, message, error } = getModules;

  const getActions = useSelector(state => state.actionsReducer);
  const { actions, ldg, msg, err } = getActions;

  useEffect(() => {
    dispatch(listaActions())
  }, [])

  // Listamos los módulos padres
  let modulesFather = [];
  let initialModule = '';
  if(modules.length > 0){
    modules.map(module => {
      let obj = {}

      if(!module.module_id){
        obj.label = module.name
        obj.module_id = module.id

        if(module.id === rowModule.module_id){
          initialModule = obj;
        }

        modulesFather.push(obj)
      }
    })
  }
  const [value, setValue] = React.useState(initialModule);

  //Listamos las acciones
  let arrayActions = [];
  actions?.map(action => {
    let obj = {}
    obj.name = action.name
    obj.action_id = action.id
    arrayActions.push(obj)
  })

  //////////////////////////////////
  const handleChange = (e) => {
    setRowModule({
      ...rowModule, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(rowModule.id){
      await dispatch(modifiedModule(rowModule))
    }else{
      await dispatch(createModule(rowModule));
    }

    //Iniciamos la alerta de la respuesta
    handleClickMessage();
    //Listamos los módulos actualizados o nuevos
    dispatch(listModules());
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
          <DialogTitle>{titleForm}</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <TextField id="outlined-basic" name="id" variant="standard" type="hidden" value={rowModule.id}/>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    value={rowModule.name}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="url"
                    margin="dense"
                    id="url"
                    label="Url"
                    type="text"
                    value={rowModule.url}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="icon"
                    margin="dense"
                    id="icon"
                    label="Icon"
                    type="text"
                    value={rowModule.icon}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                        setRowModule({
                          ...rowModule, ['module_id']: newValue?.module_id
                        })
                      }}
                      inputValue={value?.label}
                      id="module_id"
                      options={modulesFather}
                      sx={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="Module" />}
                    />
                  </AutocompleteDiv>
                </Grid>

                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      multiple
                      id="actions"
                      options={arrayActions.filter((option) => option.name)}
                      getOptionLabel={(option) => option?.name}
                      defaultValue={defaultValue}
                      filterSelectedOptions
                      onChange={(event, newValue)=> {
                        //console.log(newValue);
                        let actionsIds = []
                        newValue.map((opt) => {
                          actionsIds.push(opt.action_id)
                        })

                        setRowModule({
                          ...rowModule, ['action_id']: actionsIds
                        })
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Actions"
                          placeholder="Actions"
                        />
                      )}
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

export default ModuleForm
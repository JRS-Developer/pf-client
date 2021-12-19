import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';

import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

import {DialogContent} from "@mui/material";
import { getAccessByUser, addAccessByUser } from "../../actions/access"
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function AccessForm({openAccess, handleCloseAccess, dataForm, listData, handleClickMessage}) {
  const dispatch = useDispatch();
/*   const initialStatee = [
    "d544b900-a077-483e-b335-8a52c2fde399_4c8f8e25-63e5-46b4-b11d-309ff6666e11_318caf13-5c64-4aec-91fb-26abca03c348",
    "d544b900-a077-483e-b335-8a52c2fde399_4c8f8e25-63e5-46b4-b11d-309ff6666e11_30fe307d-363c-46d3-8cf5-184254e45198",
    "d544b900-a077-483e-b335-8a52c2fde399_4c8f8e25-63e5-46b4-b11d-309ff6666e11_f33c5435-9cb2-4d18-8530-e37f28fd231d"
  ]; */
  const initialState = [];
  let user_id = dataForm.id;
  const [checked, setChecked] = useState(initialState);
  const [dataAccess, /* setDataAccess */] = useState([])

  const getModulesAll = useSelector(state => state.accessUserReducer);
  const { modulesUser, loadingAccess, errorAccess } = getModulesAll;

  // const addAccess = useSelector(state => state.addAccessUserReducer);
  // const { message, loadingSave, error } = getModulesAll;

    if(!loadingAccess){
      modulesUser.map(padre => {
        return padre.sub_data.map(hijo => {
          return hijo.actions.map(action => {
              if(action.action_id !== null){
              let value = `${padre.id}_${hijo.id}_${action.id}`
              const currentIndex = checked.indexOf(value);
              if (currentIndex === -1) {
                checked.push(value);
                dataAccess.push({
                  user_id: dataForm.id,
                  module_id: hijo.id,
                  action_id: action.id
                })
              }
            }
          })
        })
      })
    }

  useEffect(() => {
    dispatch(getAccessByUser(dataForm.id))
  }, [dispatch])

  const handleToggle = (padre_id, hijo_id, action_id) => () => {

    const user_id = dataForm.id;
    const access = {
      user_id: user_id,
      module_id: hijo_id,
      action_id: action_id === 0 ? null : action_id,
      status: true,
    }
    let value = `${padre_id}_${hijo_id}_${action_id}`
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      access.status = false;
    }

    setChecked(newChecked);

    dispatch(addAccessByUser(access));
    //handleClickMessage();

    console.log(access)
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    dataForm.status === true ? dataForm.status = false : dataForm.status = true;
    let dataStatus = {
      id: dataForm.id,
      status: dataForm.status
    }

    handleCloseAccess();
    //Iniciamos el mensaje respuesta
    handleClickMessage()
    //Listamos la data
    dispatch(listData());
  }

  return (
    <div>
      <Dialog
        open={openAccess}
        onClose={handleCloseAccess}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth={`lg`}
        fullWidth={`lg`}
        scroll='paper'
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            ASIGNAR ACCESOS
          </DialogTitle>
          <DialogContent>

            { loadingAccess ? <h2>Loading...</h2> : errorAccess ? <h3>{errorAccess}</h3> : modulesUser.map(dt => (
              <Accordion key={dt.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{dt.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List
                    sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>
                      {dt.name}
                      <Switch key={`${user_id}_${dt.id}_0`}
                              edge="end"
                              onChange={handleToggle(user_id, dt.id, 0)}
                              checked={checked.indexOf(`${user_id}_${dt.id}_0`) !== -1}
                              inputProps={{
                                'aria-labelledby': `switch-list-label_${user_id}_${dt.id}_0`,
                              }}
                      />
                    </ListSubheader>}
                  >
                    {dt.sub_data.map( ch => (
                      <ListItem key={`${dt.id}_${ch.id}`} style={{borderBottom: '1px solid #ddd'}}>
                        <ListItemIcon>
                          <Icon>
                            {ch.icon}
                          </Icon>
                        </ListItemIcon>
                        <ListItemText id={`switch-list-label_${dt.id}_${ch.id}`} primary={ch.name} />
                        {ch.actions.map( act => (
                          <>
                            <Switch key={`${dt.id}_${ch.id}_${act.id}`}
                              edge="end"
                              onChange={handleToggle(dt.id, ch.id, act.id)}
                              checked={checked.indexOf(`${dt.id}_${ch.id}_${act.id}`) !== -1}
                              inputProps={{
                                'aria-labelledby': `switch-list-label_${dt.id}_${ch.id}_${act.id}`,
                              }}
                            /> { act.name }  &nbsp;&nbsp;
                          </>
                        ))}
                      </ListItem>
                    ) )}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseAccess}>
              Cancelar
            </Button>
            {/*<Button type="submit">Save</Button>*/}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

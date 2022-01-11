import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { getStudentsMatricula } from '../../actions/matricula'

export default function ListStudents() {

  const param = useParams();

  let body = {
    school_id: param.school_id || param.schoolId,
    clase_id: param.clase_id || param.claseId,
    ciclo_lectivo_id: param.ciclo_lectivo_id || param.cicloLectivoId
  }

  const dispatch = useDispatch()

  const getStudents = useSelector((state) => state.matriculaReducer)
  const { loading, error, studentsMatricula } = getStudents

  useEffect(() => {
    dispatch(getStudentsMatricula(body))
  }, [dispatch])

  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {loading ? <h3>Loadin..</h3>: error ? <h3>{error}</h3> : studentsMatricula?.map(st => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={st.student} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Full Name"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {st.student}
                  </Typography>
                  
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
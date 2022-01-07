import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'
import ListUserItem from './ListUserItem'
import { Fragment } from 'react'

const userItem = (users, title) => {
  return users.length ? (
    <Fragment key={`${users.length}-${title}`}>
      <Paper elevation={4}>
        <ListItem>
          <Typography
            variant="body"
            sx={{
              p: 0,

              '&:first-letter': {
                textTransform: 'capitalize',
              },
            }}
          >
            {`${title} - ${users.length}`}
          </Typography>
        </ListItem>
      </Paper>
      {users.map(({ user, online }) => {
        return (
          <ListUserItem
            key={`${user.id}-${title}`}
            user={user}
            online={online}
          />
        )
      })}
    </Fragment>
  ) : (
    []
  )
}

// ListUser
//
// users: Objeto que contiene propiedades que contienen cada una un array de usuarios,
// ej : {teachers: [], students: []}
//
const ListUser = ({ open, users }) => {
  const renderUsers = (users) => {
    let copyUsers = { ...users }

    let teachers = userItem(copyUsers.teachers, 'Profesores')
    let students = userItem(copyUsers.students, 'Estudiantes')
    // INFO: Antes se usaba este codigo comentado, pero para que funcione hay que corregir un poco el server para que mande un title y asi poder mostrar Profesores en vez de teachers
    // delete copyUsers.teachers
    //
    // let rest = Object.keys(copyUsers)
    //   .map((key) => {
    //     return userItem(users[key], key)
    //   })
    //   .flat()

    // return [{ ...teachers }, ...rest]
    return [{ ...teachers }, { ...students }]
  }

  return (
    <Paper
      sx={{
        width: open ? '25%' : '0',
        transition: '.3s all',
        overflowX: 'hidden',
        height: 'calc(100vh - 252px)',
      }}
    >
      <List
        subheader={
          <ListSubheader
            sx={{
              p: 0,
              m: 0,
              fontSize: '1.2em',
              fontWeight: 'bold',
              color: 'text',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
              }}
            >
              Usuarios
            </Typography>
          </ListSubheader>
        }
      >
        {users && renderUsers(users)}
      </List>
    </Paper>
  )
}

export default ListUser

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'
import { stringAvatar } from '../utils'
import Divider from '@mui/material/Divider'

// ListUterItem
// Item de lista de usuarios
//
// props
// - user: the user object: {id, firstName, lastName avatar}
const ListUserItem = ({ user, online }) => {
  const fullName = `${user.firstName} ${user.lastName}`

  console.log(online)
  return (
    <>
      <ListItem
        key={user.id}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          p: 0,
          m: 0,
          my: 1,
        }}
      >
        <ListItemAvatar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
            color={online ? 'success' : 'default'}
          >
            <Avatar
              alt={fullName}
              src={user.avatar}
              {...stringAvatar(fullName, { height: 30, width: 30 })}
            >
              <Typography variant="body2" sx={{ p: 0, m: 0 }}>
                {`${fullName.split(' ')[0][0]}${
                  fullName.split(' ')[1][0]
                }`.toUpperCase()}
              </Typography>
            </Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                p: 0,
                m: 0,
                whiteSpace: 'nowrap',
                width: '12em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {fullName}
            </Typography>
          }
        />
      </ListItem>
      <Divider />
    </>
  )
}

export default ListUserItem

import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'
import { stringAvatar } from '../utils'
import Divider from '@mui/material/Divider'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// ListUterItem
// Item de lista de usuarios
//
// props
// - user: the user object: {id, firstName, lastName avatar}
const ListUserItem = ({ user, online }) => {
  const fullName = `${user.firstName} ${user.lastName}`

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItemButton
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
        onClick={handleClick}
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
      </ListItemButton>
      <Divider />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Enviar mensaje</MenuItem>
      </Menu>
    </>
  )
}

export default ListUserItem

import * as React from 'react'
// import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'
import Typography from '@mui/material/Typography'
// import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { Close } from '@mui/icons-material'
import Switch from '@mui/material/Switch'
import { HeaderDiv } from './HeaderStyles'
import { logout } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../logo2.png'
import { useHistory } from 'react-router-dom'
import { getNotifications } from '../../actions/notification'

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }))
//
// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }))
//
// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }))

export default function Header({
  click,
  clickClose,
  show,
  // setTheme,
  setMode,
  mode,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  /* const [anchorNotification, setAnchorNotification] = React.useState(null) */
  /* const isNotificationOpen = Boolean(anchorNotification) */
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const dispatch = useDispatch()
  const history = useHistory()

  const { notifications } = useSelector((state) => state.notificationReducer)

  const handleModeChange = () => {
    if (mode) {
      setMode(0)
      localStorage.setItem('mode', 0)
    } else {
      setMode(1)
      localStorage.setItem('mode', 1)
    }
  }

  /* const handleNotificationOpen = (event) => {
    setAnchorNotification(event.currentTarget)
    /*  setOpen(!open) */

  /* const handleNotificationClose = () => {
    setAnchorNotification(null)
  } */

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = (URL) => {
    setAnchorEl(null)
    history.push(URL)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  React.useEffect(() => {
    const user = localStorage.getItem('user')
    user && dispatch(getNotifications(user))
  }, [dispatch])

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose('/profile')}>Mi Perfil</MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose()
          logout(dispatch)
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  )

  /* const notificationRender = (
    <Menu
      anchorEl={anchorNotification}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={'notificationItem'}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationOpen}
      onClose={handleNotificationClose}
    >
      <MenuItem>notificacion Like!</MenuItem>
      <MenuItem>notificaciones comment!</MenuItem>
      <MenuItem onClick={() => handleMenuClose('/notifications')}>
        Ver todas las notificaciones
      </MenuItem>
    </Menu>
  ) */

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Mensajes</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
          onClick={() => handleMenuClose('/notifications')}
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificaciones</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Mi Perfil</p>
      </MenuItem>
    </Menu>
  )

  return (
    <HeaderDiv>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            {show ? (
              <IconButton color="inherit" onClick={click}>
                <MenuIcon size="large" edge="start" aria-label="open drawer" />
              </IconButton>
            ) : (
              <IconButton color="inherit" onClick={clickClose}>
                <Close
                  size="large"
                  edge="start"
                  aria-label="open drawer"
                  cursor="pointer"
                />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Box sx={{ width: 50, mt: 1 }}>
                <img src={Logo} style={{ width: '100%' }} alt="Logo Gaia" />
              </Box>
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => handleMenuClose('/notifications')}
              >
                <Badge badgeContent={notifications.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
            <Switch
              defaultChecked={mode ? true : false}
              size="medium"
              color="secondary"
              edge="end"
              onChange={handleModeChange}
              checkedIcon={<DarkMode style={{ color: 'white' }} />}
              icon={<LightMode style={{ color: 'white' }} />}
            />
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {/* {notificationRender} */}
      </Box>
    </HeaderDiv>
  )
}

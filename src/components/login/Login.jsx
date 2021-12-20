import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import AccountCircle from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, /* Typography, */ Snackbar, Alert } from '@mui/material'
import validate from './validate'
import { useHistory } from 'react-router-dom'
import { setLogged, checkLogged } from '../../actions/auth/'
import { getLoginPhoto } from '../../actions/loginPhoto'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import * as React from 'react'
import Grid from '@mui/material/Grid'
import Logo from '../../logo2.png'

export default function SignInSide() {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    user: '',
    showPassword: false,
  })

  const dispatch = useDispatch()
  const { isLogged } = useSelector((state) => state.auth)
  const { photo } = useSelector((state) => state.loginPhoto)

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({
    type: 'success',
    text: '',
  })
  const [open, setOpen] = useState(false)

  const history = useHistory()

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
    setErrors(
      validate(
        { ...values, [event.target.name]: event.target.value },
        event.target.name
      )
    )
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      let { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/auth/login`,
        { email: values.user, password: values.password }
      )

      setOpen(true)
      setMessage({ type: 'success', text: data.message })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', data.user)

      dispatch(setLogged())
    } catch (error) {
      // Si hay algun error se le muestra al usuario
      setMessage({
        type: 'error',
        text: error.response?.data?.message || error.message,
      })
      setOpen(true)
    }
  }

  useEffect(() => {
    isLogged && history.push('/')
  }, [isLogged, history])

  useEffect(() => {
    dispatch(getLoginPhoto())
    dispatch(checkLogged())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={5}
        md={8}
        sx={{
          backgroundImage: `url(${photo})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={7}
        md={4}
        component={Box}
        elevation={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
          }}
        >
          <Box
            sx={{
              width: '13vw',
              minWidth: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              m: 5,
            }}
          >
            <Box sx={{ minWidth: 100 }}>
              <img src={Logo} style={{ width: '100%' }} alt="Logo Gaia" />
            </Box>
          </Box>
          <Box sx={{}}>
            <form onSubmit={handleSubmit}>
              {/* <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <LockOutlinedIcon />
              </Avatar>
              Sign in
            </Box> */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 200,
                  mb: 'calc(30vh)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                  <AccountCircle
                    sx={{ color: 'primary.light', mr: 1, mb: 4 }}
                  />
                  <TextField
                    sx={{ width: 250, height: 70 }}
                    id="input-with-sx"
                    name="user"
                    onChange={handleChange}
                    value={values.user}
                    label="Email"
                    variant="outlined"
                    helperText={errors.user ? errors.user : ''}
                    error={!!errors.user}
                    onFocus={handleChange}
                    size="small"
                  />
                </Box>
                <Box>
                  <FormControl>
                    <TextField
                      sx={{ width: 250, height: 70 }}
                      label="Password"
                      name="password"
                      id="standard-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange}
                      helperText={errors.password ? errors.password : ''}
                      variant="outlined"
                      size="small"
                      error={!!errors.password}
                      onFocus={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              sx={{ color: 'primary.light' }}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <Button
                    disabled={
                      values.user &&
                      values.password &&
                      Object.values(errors).length === 0
                        ? false
                        : true
                    }
                    variant="contained"
                    type="submit"
                  >
                    Log in
                  </Button>
                </Box>
                <Snackbar
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={() => setOpen(false)}
                >
                  <Alert
                    onClose={() => setOpen(false)}
                    severity={message.type}
                    sx={{ width: '100%' }}
                  >
                    {message.text}
                  </Alert>
                </Snackbar>
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Input,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Visibility, VisibilityOff, FileUpload } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import validate from './validate'
import { useDispatch, useSelector } from 'react-redux'
import { getDataById } from '../../actions/user'

const initialInputs = {
  password: '',
  repeatPassword: '',
}

const Account = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [image, setImage] = useState()
  const [preview, setPreview] = useState(undefined)
  const [inputs, setInputs] = useState(initialInputs)
  const [errors, setErrors] = useState({})
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const [loadingAxios, setLoadingAxios] = useState(false)
  const [successAxios, setSuccessAxios] = useState({
    isSuccess: false,
    message: '',
  })
  const [errorAxios, setErrorAxios] = useState({
    isError: false,
    message: '',
  })

  const {
    dataEdit: user,
    loading,
    error: requestError,
  } = useSelector((state) => state.usersReducer)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
    setErrors((errors) => validate({ ...inputs, [name]: value }, errors))
  }

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleClose = () => setOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = new FormData()
    // Guardo la imagen y la nueva contraseña en un formdata
    if (inputs.password) form.append('password', inputs.password)
    if (image) form.append('myFile', image)
    // Si no hay cambios en el form, entonces no envio el request
    if (!image && !inputs.password) return

    try {
      setLoadingAxios(true)

      const {
        data: { message },
      } = await axios.put(`/users/${user.id}`, form)

      setSuccessAxios({
        isSuccess: true,
        message,
      })
      setOpen(true)

      setLoadingAxios(false)
    } catch (error) {
      setErrorAxios({
        isError: true,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message,
      })

      setLoadingAxios(false)
      setOpen(true)
      console.error(error)
    }
  }

  const handleUploadImage = (e) => {
    if (e.target.files?.length === 0) {
      return setImage(undefined)
    }

    setImage(e.target.files[0])
  }

  const getUserData = async () => {
    const user = localStorage.getItem('user')
    dispatch(await getDataById(user))
  }

  useEffect(async () => {
    await getUserData()
  }, [])

  useEffect(() => {
    let objectUrl
    if (image) {
      objectUrl = URL.createObjectURL(image)
      setPreview(objectUrl)
    }
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant={'h4'}>Mi Cuenta</Typography>
      {loading ? (
        <Box
          display="flex"
          sx={{
            minHeight: '400px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          onSubmit={handleSubmit}
          component="form"
          display="flex"
          sx={{
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <Box
            display="flex"
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Box
              sx={{
                position: 'relative',

                ':hover span': {
                  opacity: 0.7,
                  backgroundColor: 'black',
                  transition: 'opacity .5s',
                },
              }}
            >
              <label htmlFor="upload">
                <Input
                  id="upload"
                  type="file"
                  sx={{ display: 'none' }}
                  onChange={handleUploadImage}
                  inputProps={{
                    accept: 'image/png, image/jpeg',
                  }}
                />
                <IconButton
                  component="span"
                  sx={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0,
                    backgroundColor: 'black',
                    transition: 'opacity .5s',
                  }}
                >
                  <FileUpload sx={{ fontSize: 80, zIndex: 9, opacity: 1 }} />
                </IconButton>
              </label>
              <Avatar
                sx={{ width: 200, height: 200 }}
                src={(image && preview) || user?.avatar}
              />
            </Box>

            {user?.firstName && user?.lastName && (
              <Typography variant="h6">{`${user?.firstName} ${user?.lastName}`}</Typography>
            )}
          </Box>
          <Box
            display="flex"
            sx={{
              flexDirection: 'column',
              gap: '2rem',
              width: '400px',
              maxWidth: '100%',
            }}
          >
            <TextField
              label="Nueva Contraseña"
              type={showPassword ? 'password' : 'text'}
              name="password"
              error={errors.password ? true : false}
              helperText={errors.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Repetir Contraseña"
              type={showPassword ? 'password' : 'text'}
              name="repeatPassword"
              error={errors.repeatPassword ? true : false}
              onChange={handleChange}
              helperText={errors.repeatPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              variant="contained"
              loading={loadingAxios}
              disabled={Object.keys(errors).length > 0}
              type="submit"
            >
              Guardar Cambios
            </LoadingButton>
          </Box>
        </Box>
      )}
      <Snackbar autoHideDuration={6000} open={open} onClose={handleClose}>
        <Alert
          severity={errorAxios.isError || requestError ? 'error' : 'success'}
          onClose={handleClose}
        >
          {errorAxios.isError
            ? errorAxios.message
            : requestError
            ? requestError
            : successAxios.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Account

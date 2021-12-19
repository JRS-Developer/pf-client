import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { Close, Save } from '@mui/icons-material'
import validate from './validate'
import {
  getUsers as listUsers,
  createUser,
  modifiedUser,
} from '../../actions/user/'
import { getRoles as listRoles } from '../../actions/role'
import { useSelector, useDispatch } from 'react-redux'

/* const currencies = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Profesor',
    label: 'Profesor',
  },
  {
    value: 'Estudiante',
    label: 'Estudiante',
  },
] */

export default function UserForm({
  open,
  handleClose,
  titleForm,
  dataForm,
  handleClickMessage,
}) {
  const [input, setInput] = useState(dataForm)
  const dispatch = useDispatch()

  const { usersReducer: getUsers, rolesReducer: getRoles } = useSelector(
    (state) => state
  )
  const { loading } = getUsers
  const { roles } = getRoles

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setInput((input) => ({ ...input, [event.target.name]: event.target.value }))
    setErrors((errors) =>
      validate(
        { ...input, [event.target.name]: event.target.value },
        event.target.name,
        errors
      )
    )
  }

  const handleDateChange = (value) => {
    setInput((input) => ({ ...input, birthdate: value }))
    setErrors((errors) =>
      validate({ ...input, birthdate: value }, 'birthdate', errors)
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = input

    if (user.id) {
      await dispatch(modifiedUser(user))
    } else {
      await dispatch(createUser(user))
    }

    //Cerramos el formulario
    handleClose()
    // Iniciamos el mensaje de respuesta
    handleClickMessage()
    //Listamos las actions
    dispatch(listUsers())
  }

  // Si no hay roles en el stado, entonces los obtengo
  useEffect(() => {
    if (!roles.length) dispatch(listRoles())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles])

  return (
    <center>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`sm`}
        fullWidth={`sm`}
        scroll="paper"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm}</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>

            <Stack spacing={2}>
              <div>
                <TextField
                  error={errors.firstName ? true : false}
                  name="firstName"
                  id="firstName"
                  label="Nombre"
                  placeholder="Nombre"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.firstName}
                  value={input.firstName}
                />
                <TextField
                  error={errors.lastName ? true : false}
                  sx={{ ml: 2 }}
                  name="lastName"
                  id="lastName"
                  label="Apellido"
                  placeholder="Apellido"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.lastName}
                  value={input.lastName}
                />
              </div>
              <div>
                <TextField
                  error={errors.email ? true : false}
                  name="email"
                  id="email"
                  label="Email"
                  placeholder="Email"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.email}
                  value={input.email}
                />
                <TextField
                  error={errors.password ? true : false}
                  sx={{ ml: 2 }}
                  name="password"
                  id="password"
                  label="Contraseña"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.password}
                  value={input.password}
                />
              </div>
              <div>
                <TextField
                  error={errors.userName ? true : false}
                  name="userName"
                  id="userName"
                  label="Nombre de usuario"
                  placeholder="Nombre de usuario"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.userName}
                  value={input.userName}
                />
                <TextField
                  error={errors.identification ? true : false}
                  sx={{ ml: 2 }}
                  name="identification"
                  id="identification"
                  label="Identificacion"
                  placeholder="Identificación"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.identification}
                  value={input.identification}
                />
              </div>
              <div>
                <TextField
                  error={errors.country ? true : false}
                  name="country"
                  id="country"
                  label="Pais"
                  placeholder="País"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.country}
                  value={input.country}
                />

                <TextField
                  error={errors.role ? true : false}
                  name="role"
                  sx={{ ml: 2, width: 200 }}
                  id="outlined-select-currency"
                  select
                  label="Seleccione"
                  value={input.role?.id || input.role || ''}
                  onChange={handleChange}
                  helperText={errors.role}
                >
                  <MenuItem disabled value="">
                    <em>Seleccione</em>
                  </MenuItem>

                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div>
                <TextField
                  name="avatar"
                  sx={{ mr: 2 }}
                  id="avatar"
                  label="Avatar"
                  placeholder="Avatar"
                  onChange={handleChange}
                  onFocus={handleChange}
                  value={input.avatar}
                  defaultValue={''}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Basic example"
                    value={input.birthdate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errors.birthdate ? true : false}
                        name="birthdate"
                        id="date"
                        label="Birthdate"
                        type="date"
                        helperText={errors.birthdate}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </Stack>
          </DialogContent>
          <DialogActions>
            {!loading ? (
              <>
                <Button
                  type="submit"
                  disabled={
                    Object.values(input).length >= 8 &&
                    Object.values(errors).length === 0
                      ? false
                      : true
                  }
                  variant="contained"
                  endIcon={<Save />}
                >
                  Guardar
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleClose}
                  startIcon={<Close />}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<Save />}
                variant="outlined"
              >
                Save
              </LoadingButton>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </center>
  )
}

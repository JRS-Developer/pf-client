import { useState } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Close, Save } from '@mui/icons-material';
import validate from './validate'


const currencies = [
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
]
export default function UserForm({open, handleClose, titleForm, dataForm}) {
  const [input, setInput] = useState(dataForm);

  const [errors, setErrors] = useState({
  })

  console.log(input)

  /* const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    country: '',
    role: '',
    birthday: '',
  }) */

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
    setErrors(
      validate(
        { ...input, [event.target.name]: event.target.value },
        event.target.name,
        errors
      )
    )
  }

  return (
    <center>
    <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`sm`}
        fullWidth={`sm`}
        scroll='paper'
      >
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
    
      <Stack component="form" noValidate spacing={2}>
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
            error={errors.id ? true : false}
            sx={{ ml: 2 }}
            name="id"
            id="identification"
            label="Identificacion"
            placeholder="Identificación"
            onChange={handleChange}
            onFocus={handleChange}
            helperText={errors.id}
            value={input.id}
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
            sx={{ ml: 2, width: 223 }}
            id="outlined-select-currency"
            select
            label="Seleccione"
            value={input.rol}
            onChange={handleChange}
            helperText={errors.role}
            defaultValue={input.role}
          >
            <MenuItem disabled value="">
              <em>Seleccione</em>
            </MenuItem>

            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            error={errors.birthday ? true : false}
            onChange={handleChange}
            onFocus={handleChange}
            name="birthday"
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            helperText={errors.birthday}
            sx={{ width: 220 }}
            value={input.birthday}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </Stack>
      </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={Object.values(input).length === 7 && Object.values(errors).length === 0 ? false : true} variant="contained" onClick={handleClose} endIcon={<Save />}>
            Guardar
          </Button>
          <Button variant="outlined" onClick={handleClose} startIcon={<Close />}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </center>
  )
}
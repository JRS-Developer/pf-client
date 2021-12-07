import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
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
    value: 'Alumno',
    label: 'Alumno',
  },
]
export default function CreateUser() {
  const [errors, setErrors] = useState({
    firstName: `This field is required`,
    lastName: `This field is required`,
    email: `This field is required`,
    id: `This field is required`,
    country: `This field is required`,
    role: `This field is required`,
    birthday: `This field is required`,
  })

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    country: '',
    role: '',
    birthday: '',
  })

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
      <Stack component="form" noValidate spacing={2}>
        <div>
          <TextField
            error={errors.firstName ? true : false}
            name="firstName"
            id="firstName"
            label="Nombre"
            placeholder="Nombre"
            onChange={handleChange}
            helperText={errors.firstName}
          />
          <TextField
            error={errors.lastName ? true : false}
            sx={{ ml: 2 }}
            name="lastName"
            id="lastName"
            label="Apellido"
            placeholder="Apellido"
            onChange={handleChange}
            helperText={errors.lastName}
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
            helperText={errors.email}
          />

          <TextField
            error={errors.id ? true : false}
            sx={{ ml: 2 }}
            name="id"
            id="identification"
            label="Identificacion"
            placeholder="Identificación"
            onChange={handleChange}
            helperText={errors.id}
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
            helperText={errors.country}
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
            name="birthday"
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            helperText={errors.birthday}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <Button
            disabled={Object.keys(errors).length === 0 ? false : true}
            type="submit"
            variant="contained"
          >
            Crear
          </Button>
        </div>
      </Stack>
    </center>
  )
}

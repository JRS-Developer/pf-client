import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
];
export default function CreateUser() {
    const [currency, setCurrency] = useState('');
    const [date, setDate] = useState(new Date('2014-08-18T21:11:54'));

  const handleDate = (newValue) => {
    setDate(newValue);
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Stack component="form" noValidate spacing={2}>
      <div>
        <TextField
          
          id="firstName"
          label="Nombre"
          placeholder="Nombre"
        />
        <TextField 
          sx={{ ml: 2 }}
          id="lastName"
          label="Apellido"
          placeholder="Apellido"
        />
      </div>
      <div>
      <TextField
          
          id="email"
          label="Email"
          placeholder="Email"
        />
    
      <TextField 
          sx={{ ml: 2 }}
          id="identification"
          label="Identificacion"
          placeholder="Identificación"
        />
      </div>
      <div>
      <TextField
          
          id="country"
          label="Pais"
          placeholder="País"
        />
     
        <TextField
          sx={{ ml: 2, width: 223 }} 
          id="outlined-select-currency"
          select
          label="Seleccione"
          value={currency}
          onChange={handleChange}
          
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
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      /></div>
      <div><Button type="submit" variant="contained">Crear</Button></div>
    </Stack>
  );
}

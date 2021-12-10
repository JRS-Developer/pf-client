import { useState } from 'react'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import AccountCircle from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button } from '@mui/material'
import Validate from './validateform'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    user: '',
    showPassword: false,
  })

  const [errors, setErrors] = useState({
    user: 'Email requerido',
    password: 'Password requerido',
  })

  const history = useHistory();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
    setErrors(Validate({ ...values, [event.target.name]: event.target.value }))
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
    event.preventDefault()
    let { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/auth/login`,
      { email: values.user, password: values.password }
    )
    localStorage.setItem("token",data.token)
    // Para que sea el header global pero todavia no funciona
    //axios.defaults.headers.common["x-access-token"] = data.token
    history.push("/")

    
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            name="user"
            onChange={handleChange}
            value={values.user}
            label="Email"
            variant="standard"
            helperText={errors.user ? errors.user : ''}
            error={!!errors.user}
          />
        </Box>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <TextField
            label="Password"
            name="password"
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            helperText={errors.password ? errors.password : ''}
            variant="standard"
            error={!!errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button
          disabled={!!errors.user || !!errors.password}
          variant="outlined"
          type="submit"
        >
          Log in
        </Button>
      </Box>
    </form>
  )
}

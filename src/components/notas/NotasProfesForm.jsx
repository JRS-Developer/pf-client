import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
// import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import DatePicker from '@mui/lab/DatePicker'
import { Close, Save } from '@mui/icons-material'
import validate from './validate'
import {
  getUsers as listUsers,
  createUser,
  modifiedUser,
} from '../../actions/user/'
import { getRoles as listRoles } from '../../actions/role'
import { useSelector, useDispatch } from 'react-redux'

// const currencies = [
//   {
//     value: 'Admin',
//     label: 'Admin',
//   },
//   {
//     value: 'Profesor',
//     label: 'Profesor',
//   },
//   {
//     value: 'Estudiante',
//     label: 'Estudiante',
//   },
// ]

export default function NotasProfesor({
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
                  error={errors.check1 ? true : false}
                  sx={{ ml: 2 }}
                  name="check1"
                  id="check1"
                  label="Check 1"
                  placeholder=""
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.check1}
                  value={input.check1}
                />
                <TextField
                  error={errors.check2 ? true : false}
                  sx={{ ml: 2 }}
                  name="check2"
                  id="check2"
                  label="check2"
                  placeholder="check2"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.check2}
                  value={input.check2}
                />
              </div>
              <div>
                <TextField
                  error={errors.check3 ? true : false}
                  sx={{ ml: 2 }}
                  name="check3"
                  id="check3"
                  label="check3"
                  placeholder="check3"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.check3}
                  value={input.check3}
                />
                <TextField
                  error={errors.check4 ? true : false}
                  sx={{ ml: 2 }}
                  name="check4"
                  id="check4"
                  label="check4"
                  placeholder="check4"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.check4}
                  value={input.check4}
                />
              </div>
              <div>
                <TextField
                  error={errors.check5 ? true : false}
                  sx={{ ml: 2 }}
                  name="check5"
                  id="check5"
                  label="Check 5"
                  placeholder="Check 5"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.check5}
                  value={input.check5}
                />
                <TextField
                  error={errors.check6 ? true : false}
                  sx={{ ml: 2 }}
                  name="check6"
                  id="check6"
                  label="Check 6"
                  placeholder="Check 6"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.check6}
                  value={input.check6}
                />
              </div>
              <div>
                <TextField
                  error={errors.check7 ? true : false}
                  sx={{ ml: 2 }}
                  name="Check 7"
                  id="Check 7"
                  label="Check 7"
                  placeholder="Check 7"
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.check7}
                  value={input.check7}
                />

                <TextField
                  error={errors.check8 ? true : false}
                  sx={{ ml: 2 }}
                  name="check8"
                  id="check8"
                  label="Check 8"
                  placeholder="Check 8"
                  value={input.check8}
                  onChange={handleChange}
                  onFocus={handleChange}
                  helperText={errors.check8}
                />
              </div>
              <div>
                <TextField
                  error={errors.check9 ? true : false}
                  sx={{ ml: 2 }}
                  name="check9"
                  id="check9"
                  label="Check 9"
                  placeholder="Check 9"
                  onChange={handleChange}
                  onFocus={handleChange}
                  value={input.check9}
                  helperText={errors.check9}
                  
                />
          
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

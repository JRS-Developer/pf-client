import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Autocomplete from '@mui/material/Autocomplete'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import { Close, Save } from '@mui/icons-material'
import {
  getSchools as listSchools,
  createSchool,
  modifiedSchool,
} from '../../actions/school'
import { getClases as listClases } from '../../actions/clase'

const SchoolForm = ({
  open,
  handleClose,
  titleForm,
  dataForm,
  handleClickMessage,
}) => {
  if (dataForm) {
    dataForm.class_ids = []
  }

  const [rowSchool, setRowSchool] = React.useState(dataForm)

  const dispatch = useDispatch()

  const getStatusReducer = useSelector((state) => state.schoolReducer)
  const { loadingSchool } = getStatusReducer

  const getClases = useSelector((state) => state.clasesReducer)
  const { loadingClases, clases } = getClases

  let defaultClases = []

  React.useEffect(() => {
    dispatch(listClases())
  }, [])

  const handleChange = (e) => {
    setRowSchool({
      ...rowSchool,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rowSchool.id) {
      await dispatch(modifiedSchool(rowSchool))
    } else {
      await dispatch(createSchool(rowSchool))
    }

    //Iniciamos la alerta de la respuesta
    handleClickMessage()
    //Listamos los módulos actualizados o nuevos
    dispatch(listSchools())
    //Cerramos el modal del formulario
    handleClose()
  }

  //Listamos las clases
  let arrayClases = []
  clases?.map((clase) => {
    let obj = {}
    obj.name = clase.name
    obj.clase_id = clase.id
    return arrayClases.push(obj)
  })

  return (
    <div>
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  name="id"
                  variant="standard"
                  type="hidden"
                  value={rowSchool.id}
                />
                <TextField
                  name="name"
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  value={rowSchool.name}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="materias"
                  options={arrayClases.filter((option) => option.name)}
                  getOptionLabel={(option) => option?.name}
                  defaultValue={defaultClases}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    let clasesIds = []
                    newValue.map((opt) => {
                      return clasesIds.push(opt.clase_id)
                    })

                    setRowSchool({
                      ...rowSchool,
                      class_ids: clasesIds,
                    })
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Clases"
                      placeholder="Clases"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {!loadingSchool ? (
              <>
                <Button type="submit" variant="contained" endIcon={<Save />}>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  startIcon={<Close />}
                >
                  Cancel
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
    </div>
  )
}

export default SchoolForm

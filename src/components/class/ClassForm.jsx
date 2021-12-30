import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Close, Save } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { AutocompleteDiv } from './ClassStyles'
import Autocomplete from '@mui/material/Autocomplete'

import {
  getClases as listClases,
  createClase,
  modifiedClase,
} from '../../actions/clase'
import { getMaterias as listMaterias } from '../../actions/materia'
import { getSchools as listSchools } from '../../actions/school'

const ClassForm = ({
  open,
  handleClose,
  titleForm,
  dataForm,
  handleClickMessage,
}) => {
  if (dataForm) {
    dataForm.materia_ids = []
  }

  let defaultMaterias = []

  dataForm?.materias?.map((materia) => {
    defaultMaterias.push({
      name: materia.name,
      materia_id: materia.id,
    })

    return dataForm.materia_ids.push(materia.id)
  })

  const [rowClass, setRowClass] = useState(dataForm)

  const dispatch = useDispatch()

  const getStatusReducer = useSelector((state) => state.clasesReducer)
  const { loading } = getStatusReducer

  const getMaterias = useSelector((state) => state.materiasReducer)
  const { /* loadingMaterias, */ materias } = getMaterias

  const getSchools = useSelector((state) => state.schoolReducer)
  const { loadingSchool, schools } = getSchools

  const handleChange = (e) => {
    setRowClass({
      ...rowClass,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    dispatch(listMaterias())

    dispatch(listSchools())
  }, [])

  //Listamos las materias
  let arrayMaterias = []
  materias?.map((materia) => {
    let obj = {}
    obj.name = materia.name
    obj.materia_id = materia.id
    return arrayMaterias.push(obj)
  })

  // Listamos Los colegios
  let listaSchools = []
  let initialSchools = []
  schools?.forEach((school) => {
    listaSchools.push({
      id: school.id,
      label: school.name,
    })

    const hasTheSchool = dataForm?.schools?.find((s) => s.id === school.id)

    if (hasTheSchool) {
      initialSchools.push({
        id: school.id,
        label: school.name,
      })
    }
  })

  const [valueSchool, setValueSchool] = useState(dataForm?.id && initialSchools)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rowClass.id) {
      await dispatch(modifiedClase(rowClass))
    } else {
      await dispatch(createClase(rowClass))
    }

    //Iniciamos la alerta de la respuesta
    handleClickMessage()
    //Listamos las clases actualizados o nuevos
    dispatch(listClases())
    //Cerramos el modal del formulario
    handleClose()
  }

  console.log(valueSchool)

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`md`}
        fullWidth={`md`}
        scroll="paper"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm} Clase</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                id="outlined-basic"
                name="id"
                variant="standard"
                type="hidden"
                value={rowClass.id}
              />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      multiple
                      loading={loadingSchool}
                      defaultValue={valueSchool}
                      filterSelectedOptions
                      onChange={(_event, newValue) => {
                        let schoolsIds = []
                        newValue.map((opt) => {
                          return schoolsIds.push(opt.id)
                        })
                        setRowClass({
                          ...rowClass,
                          school_ids: schoolsIds,
                        })
                      }}
                      inputValue={valueSchool?.label}
                      id="school_id"
                      options={listaSchools}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField {...params} label="School" />
                      )}
                    />
                  </AutocompleteDiv>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    value={rowClass.name}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      multiple
                      id="materias"
                      options={arrayMaterias.filter((option) => option.name)}
                      getOptionLabel={(option) => option?.name}
                      defaultValue={defaultMaterias}
                      filterSelectedOptions
                      onChange={(_event, newValue) => {
                        let materiasIds = []
                        newValue.map((opt) => {
                          return materiasIds.push(opt.materia_id)
                        })

                        setRowClass({
                          ...rowClass,
                          materia_ids: materiasIds,
                        })
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Materias"
                          placeholder="Materias"
                        />
                      )}
                    />
                  </AutocompleteDiv>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            {!loading ? (
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

export default ClassForm

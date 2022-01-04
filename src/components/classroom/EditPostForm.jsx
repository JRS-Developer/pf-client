import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  TextField,
  Input,
  Button,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material'
import { Image, Article, AttachFile } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { shortName } from './utils'
import { updatePost, getPosts } from '../../actions/post'
import { useDispatch, useSelector } from 'react-redux'

// Esta funcion separa los archivos viejos de los nuevos, los nuevos seran subidos por el parametro de multer para subir archivos.
// INFO: El parametro es myFile
const getOldAndNewFiles = (files) => {
  const oldFiles = []
  const newFiles = []
  // Para los viejos archiovos le coloco solo el ID, que es lo que pide la api, y para los nuevos le coloco el archivo tal cual
  files.forEach((file) =>
    file?.id ? oldFiles.push(file.id) : newFiles.push(file)
  )

  return [oldFiles, newFiles]
}

const isFileImage = (file) => {
  const isImage = file['type'].split('/')[0] === 'image'
  const acceptedImageTypes = [
    'image/svg',
    'image/jpeg',
    'image/png',
    'image/jpg',
  ]
  const isAceptedType = acceptedImageTypes.includes(file['type'])

  return {
    isValid: file && isAceptedType && isImage,
    isImage,
  }
}

const filterFiles = (files, fileToCompare) =>
  files.filter((file) => file.name !== fileToCompare.name)

const separateImgsAndDocs = (files) => {
  const newImages = []
  const newDocs = []

  Array.from(files).forEach((file) => {
    const { isImage, isValid } = isFileImage(file)
    // Si es una imagen y es valido (png, jpeg, svg) entonces lo añado a imagenes
    isImage && isValid && newImages.push(file)
    // Si no es una imagen, lo pongo en newDocs
    !isImage && newDocs.push(file)
  })

  return [newImages, newDocs]
}

// removeRepeatedFiles a function that removes repeated files from an array of files
// INFO: El parametro es myFile
const removeRepeatedFiles = (files, oldFiles) => {
  const result = Array.from(files).filter(
    (file) =>
      !Array.from(oldFiles).some((old) => {
        return old.name === file.name
      })
  )

  return result
}

const validateInputs = (inputs, name, errors) => {
  if (name === 'title') {
    inputs[name] === ''
      ? (errors[name] = 'El titulo no puede estar vacio')
      : delete errors[name]
  }

  if (name === 'text') {
    inputs[name] === ''
      ? (errors[name] = 'La descripcion no puede estar vacio')
      : delete errors[name]
  }

  return errors
}

const EditPostForm = ({ open, handleClose, post }) => {
  const [imgs, setImgs] = useState(post.images)
  const [docs, setDocs] = useState(post.documents)

  const [inputs, setInputs] = useState({
    title: post.title,
    text: post.text,
  })

  const [errors, setErrors] = useState({})

  const { loading } = useSelector((state) => state.postsReducer)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }))
    console.log(inputs)
    setErrors((errors) =>
      validateInputs(
        { ...inputs, [e.target.name]: e.target.value },
        e.target.name,
        errors
      )
    )
  }

  const handleUploadFile = (e) => {
    const files = e.target.files

    // Separo las imagenes y los documentos
    let [newImages, newDocs] = separateImgsAndDocs(files)
    // Remuevo los repetidos
    newImages = removeRepeatedFiles(newImages, imgs)
    newDocs = removeRepeatedFiles(newDocs, docs)

    // Coloco las nuevas imagenes y documentos
    newDocs.length && setDocs((docs) => [...docs, ...newDocs])
    newImages.length && setImgs((imgs) => [...imgs, ...newImages])

    // Limpio el valor del input file
    e.target.value = null
  }

  const handleDelImg = (imgToDelete) => {
    setImgs((imgs) => filterFiles(imgs, imgToDelete))
  }

  const handleDelDoc = (docToDelete) => {
    setDocs((docs) => filterFiles(docs, docToDelete))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = new FormData()
    const [imagesReq, newImages] = getOldAndNewFiles(imgs)
    const [docsReq, newDocs] = getOldAndNewFiles(docs)

    // Añado las imagenes y documentos viejos

    for (let img of imagesReq) {
      form.append('images', img)
    }
    for (let doc of docsReq) {
      form.append('documents', doc)
    }

    // Obtengo los nuevos archivos y los uno en uno solo para ponerlo en el parametro myFile
    const newFiles = [...newImages, ...newDocs]

    for (let file of newFiles) {
      form.append('myFile', file)
    }

    // Añado los valores de los inputs
    Object.keys(inputs).forEach((key) => form.append(key, inputs[key]))

    dispatch(await updatePost(form, post.id))
    dispatch(
      await getPosts(
        post.classId,
        post.materiaId,
        post.cicloLectivoId,
        post.schoolId
      )
    )
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Editar Publicación</DialogTitle>
        <DialogContent>
          <Grid container columns={12}>
            <Grid item xs={12}>
              <Box
                display="flex"
                sx={{
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <TextField
                  sx={{
                    width: '100%',
                  }}
                  margin="dense"
                  label="Titulo"
                  defaultValue={post.title}
                  name="title"
                  onChange={handleChange}
                  error={errors.title ? true : false}
                  helperText={errors.title}
                />
                <Tooltip title="Añadir archivos">
                  <label htmlFor="upload">
                    <Input
                      sx={{
                        display: 'none',
                      }}
                      type="file"
                      id="upload"
                      onChange={handleUploadFile}
                    />
                    <IconButton component="span">
                      <AttachFile />
                    </IconButton>
                  </label>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{
                  width: '100%',
                }}
                name="text"
                margin="dense"
                label="Descripción"
                defaultValue={post.text}
                onChange={handleChange}
                multiline
                rows={4}
                error={errors.text ? true : false}
                helperText={errors.text}
              />
            </Grid>
          </Grid>
          {imgs.length ? (
            <DialogContent>
              <DialogContentText>Imagenes</DialogContentText>
              <Box
                display="flex"
                sx={{
                  gap: 1,
                  flexWrap: 'wrap',
                }}
              >
                {imgs.map((img) => (
                  <Chip
                    key={`${img.id || img.name}-item`}
                    icon={<Image />}
                    label={shortName(img.name, 10)}
                    color="primary"
                    onDelete={() => handleDelImg(img)}
                  />
                ))}
              </Box>
            </DialogContent>
          ) : null}
          {docs.length ? (
            <DialogContent
              sx={{
                paddingTop: 0,
              }}
            >
              <DialogContentText>Documentos</DialogContentText>
              <Box
                display="flex"
                sx={{
                  gap: 1,
                  flexWrap: 'wrap',
                }}
              >
                {docs.map((doc) => (
                  <Chip
                    key={`${doc.id || doc.name}-item`}
                    icon={<Article />}
                    label={shortName(doc.name, 10)}
                    color="primary"
                    onDelete={() => handleDelDoc(doc)}
                  />
                ))}
              </Box>
            </DialogContent>
          ) : null}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            disabled={Object.keys(errors).length > 0}
          >
            Guardar Cambios
          </LoadingButton>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditPostForm

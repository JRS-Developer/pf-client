import {
  Dialog,
  DialogContent,
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
import { updatePost } from '../../actions/post'
import { useDispatch, useSelector } from 'react-redux'

const getFilesIds = (files) => files.map((file) => file.id)

const isFileImage = (file) => {
  const isImage = file['type'].split('/')[0] === 'image'
  const acceptedImageTypes = ['image/svg', 'image/jpeg', 'image/png']
  const isAceptedType = acceptedImageTypes.includes(file['type'])

  return {
    isValid: file && isAceptedType && isImage,
    isImage,
  }
}

const EditPostForm = ({ open, handleClose, post }) => {
  const [imgs, setImgs] = useState(post.images)
  const [docs, setDocs] = useState(post.documents)
  const [newFiles, setNewFiles] = useState([])

  const { loading } = useSelector((state) => state.postsReducer)
  const dispatch = useDispatch()

  const handleUploadFile = (files) => {
    const newImages = []
    const newDocs = []

    files.forEach((file) => {
      const { isImage, isValid } = isFileImage(file)
      // Si es una imagen y es valido (png, jpeg, svg) entonces lo añado a imagenes
      isImage && isValid && newImages.push(file)
      // Si no es una imagen, lo pongo en newDocs
      !isImage && newDocs.push(file)
    })

    newDocs.length && setDocs((docs) => [...docs, ...newDocs])
    newImages.length && setImgs((imgs) => [...imgs, ...newImages])
  }

  const handleDelImg = (imgToDelete) => {
    setImgs((imgs) => imgs.filter((img) => img.id !== imgToDelete.id))
  }

  const handleDelDoc = (docToDelete) => {
    setDocs((docs) => docs.filter((doc) => doc.id !== docToDelete.id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('images', JSON.stringify(getFilesIds(imgs)))
    formData.append('documents', JSON.stringify(getFilesIds(docs)))

    dispatch(await updatePost(formData, post.id))
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
                  value={post.title}
                />
                <Tooltip title="Añadir archivos">
                  <label htmlFor="upload">
                    <Input
                      sx={{
                        display: 'none',
                      }}
                      type="file"
                      id="upload"
                    />
                    <IconButton>
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
                margin="dense"
                label="Descripción"
                value={post.text}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          {imgs.length ? (
            <DialogContent>
              {imgs.map((img) => (
                <Chip
                  key={`${img.id}-item`}
                  icon={<Image />}
                  label={shortName(img.name, 10)}
                  color="primary"
                  onDelete={() => handleDelImg(img)}
                />
              ))}
            </DialogContent>
          ) : null}
          {docs.length ? (
            <DialogContent>
              {docs.map((doc) => (
                <Chip
                  key={`${doc.id}-item`}
                  icon={<Article />}
                  label={shortName(doc.name, 10)}
                  color="primary"
                  onDelete={() => handleDelDoc(doc)}
                />
              ))}
            </DialogContent>
          ) : null}
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" type="submit" loading={loading}>
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

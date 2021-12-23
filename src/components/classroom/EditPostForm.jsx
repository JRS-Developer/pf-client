import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Grid,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

const EditPostForm = ({ open, handleClose, post }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Editar Publicación</DialogTitle>
        <DialogContent>
          <Grid container columns={12}>
            <Grid item xs={12}>
              <TextField
                sx={{
                  width: '100%',
                }}
                margin="dense"
                label="Titulo"
                value={post.title}
              />
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
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" type="submit">
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

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Dialog } from '@mui/material/'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, deletePost } from '../../actions/post'
import { useParams } from 'react-router-dom'
import CreatePost from './CreatePost'
import ConfirmDialog from '../alert/ConfirmDialog'
import EditPostForm from './EditPostForm'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import Button from '@mui/material/Button'

export default function Feed({valueCiclo,valueSchool, noticias , nuevo}) {
  const [open, setOpen] = useState(false) //Este es para el Dialog que muestra la imagen de una publicacion
  const [openConfirm, setOpenConfirm] = useState(false) // Dialong Confirm, aqui muestra para eliminar la publicacion
  const [openEdit, setOpenEdit] = useState()
  const [dataPost, setDataPost] = useState({})
  const [img, setImg] = useState(undefined)
  const [postSubmitted, setPostSubmitted] = useState(true)

  const { posts, loading } = useSelector((store) => store.postsReducer)

  const dispatch = useDispatch()
  // const { claseId, materiaId, cicloLectivoId, schoolId } = useParams()
  const params = useParams()
  const claseId = params.claseId || params.clase_id || null
  const materiaId = params.materiaId || params.materia_id || null
  const cicloLectivoId = params.cicloLectivoId || params.ciclo_lectivo_id || valueCiclo
  const schoolId = params.schoolId || params.school_id || valueSchool
  const parametros = { claseId, materiaId, cicloLectivoId, schoolId }

  const handleFull = (img) => {
    setOpen(true)
    setImg(img)
  }

  const handleClose = () => setOpen(false)

  const handleOpenConfirm = () => setOpenConfirm(true)
  const handleCloseConfirm = () => setOpenConfirm(false)

  const handleDelete = (post) => {
    setDataPost(post)
    handleOpenConfirm(true)
  }

  const handleEdit = (post) => {
    setDataPost(post)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => setOpenEdit(false)

  
  useEffect(() => {
    dispatch(getPosts(claseId, materiaId, cicloLectivoId, schoolId))
  }, [dispatch, claseId, materiaId, cicloLectivoId, schoolId, postSubmitted])

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Grid container spacing={2} pt={5}>
        {/* <Paper
          display="grid"
          align="center"
          sx={{
            mt:2,
            ml: 2,
            p: 1,
            border: 1,
            borderColor: 'primary.main',
            borderRadius: 1,
            display: 'flex',
            width: '100%', justifyContent: "center", alignItems: "center"
          }}
        >
          <Box sx={{p: 2, display: "flex", justifyContent: "center", alignItems: "center", width: '100%'}}>
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <TextField
                  label="Meet"
                  name="meet"
                  variant="outlined"
                  sx={{ width: '100%', height: '40px' }}
                  size="small"
                  //onChange={handleChange}
                  //value={post.title}
                />
              </Grid>
              <Grid item xs={1} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    width: '50px',
                    height: '40px',
                  }}
                >
                  Publicar
                </Button>
              </Grid>
              <Grid item xs={1} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button
                  variant="contained"
                  size="small"
                  href="http://meet.google.com/new"
                  target="_blank"
                  rel="noopener"
                  sx={{ width: '50px', height: '40px' }}
                >
                  Nuevo Meet
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper> */}
        { !noticias || nuevo ?( //verificacion que le paso desde el componente noticias para que me renderice si el usuario tiene la action nuevo
        <CreatePost
          getPosts={getPosts}
          loading={loading}
          params={parametros}
          setPostSubmitted={setPostSubmitted}
          postSubmitted={postSubmitted}
        />):null}
             
        {posts?.length ? (
          posts.map((e) => (
            <Post
              key={e.id}
              id={e.id}
              avatar={e.publisher.avatar}
              title={e.title}
              description={e.text}
              name={`${e.publisher.firstName} ${e.publisher.lastName}`}
              imgs={e.images}
              docs={e.documents}
              date={e.createdAt}
              likes={e.likes}
              madeLike={e.madeLike}
              handleFull={handleFull}
              handleDelete={() => handleDelete(e)}
              handleEdit={() => handleEdit(e)}
              publisherId={e.publisher_id}
            />
          ))
        ) : (
          <Grid item>Sin publicaciones</Grid>
        )}
        <Dialog open={open} onClose={handleClose}>
          <img src={img?.url} alt={img?.name} />
        </Dialog>
        {openConfirm && (
          <ConfirmDialog
            openConfirm={openConfirm}
            handleCloseConfirm={handleCloseConfirm}
            message="¿ Esta seguro de eliminar la publicacion ?"
            listData={() =>
              getPosts(claseId, materiaId, cicloLectivoId, schoolId)
            }
            fnModifiedStatus={deletePost}
            dataForm={dataPost}
            handleClickMessage={() => {}}
          />
        )}
        {openEdit && (
          <EditPostForm
            open={openEdit}
            handleClose={handleCloseEdit}
            post={dataPost}
          />
        )}
      </Grid>
    </Box>
  )
}

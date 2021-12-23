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

export default function Feed() {
  const [open, setOpen] = useState(false) //Este es para el Dialog que muestra la imagen de una publicacion
  const [openConfirm, setOpenConfirm] = useState(false) // Dialong Confirm, aqui muestra para eliminar la publicacion
  const [openEdit, setOpenEdit] = useState()
  const [dataPost, setDataPost] = useState({})
  const [img, setImg] = useState(undefined)

  const { posts, message } = useSelector((store) => store.postsReducer)

  const dispatch = useDispatch()
  const { claseId, materiaId } = useParams()

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
    dispatch(getPosts(claseId, materiaId))
  }, [claseId, materiaId, dispatch])

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Grid container spacing={2}>
        <CreatePost />
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
            listData={() => getPosts(claseId, materiaId)}
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

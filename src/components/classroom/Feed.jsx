import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Dialog } from '@mui/material/'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import {
  getPosts /* createPost, updatePost, deletePost, likePost, getPost */,
} from '../../actions/post'
import { useParams } from 'react-router-dom'

export default function Feed() {
  const [open, setOpen] = useState(false)
  const [img, setImg] = useState(undefined)

  const posts = useSelector((store) => store.postsReducer).posts
  const dispatch = useDispatch()
  const { claseId, materiaId } = useParams()

  const handleFull = (img) => {
    setOpen(true)
    setImg(img)
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    dispatch(getPosts(claseId, materiaId))
  }, [claseId, materiaId, dispatch])
  console.log(posts)

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Grid container spacing={2}>
        {posts?.length ? (
          posts.map((e, i) => (
            <Post
              key={`p${i}`}
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
            />
          ))
        ) : (
          <Grid item>Sin publicaciones</Grid>
        )}
        <Dialog open={open} onClose={handleClose}>
          <img src={img?.url} alt={img?.name} />
        </Dialog>
      </Grid>
    </Box>
  )
}

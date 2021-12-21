import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import {
  getPosts /* createPost, updatePost, deletePost, likePost, getPost */,
} from '../../actions/post'
import { useParams } from 'react-router-dom'

export default function Feed() {
  const posts = useSelector((store) => store.postsReducer).posts
  const dispatch = useDispatch()
  const { claseId, materiaId } = useParams()

  useEffect(() => {
    dispatch(getPosts(claseId, materiaId))
  }, [])

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Grid container spacing={2}>
        {posts &&
          posts.map((e, i) => (
            <Post
              key={`p${i}`}
              avatar={e.publisher.avatar}
              title={e.title}
              description={e.text}
              name={`${e.publisher.firstName} ${e.publisher.lastName}`}
              img={e.images}
              date={e.createdAt}
              likes={e.likes}
              madeLike={e.madeLike}
            />
          ))}
      </Grid>
    </Box>
  )
}

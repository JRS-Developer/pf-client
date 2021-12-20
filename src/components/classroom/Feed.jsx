import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, /* createPost, updatePost, deletePost, likePost, getPost */ } from '../../actions/post'

export default function Feed() {
  const posts = useSelector((store) => store.postsReducer).posts
  const dispatch = useDispatch()
  
  useEffect(() => {
   /*  dispatch(createPost({
      "title": "Prueba Dispatch",
      "text": "Bienvenidos todos al inicio a clases",
      "publisher_id": "ab11729b-d0f1-4976-821d-8a30c3c178e7"
    })) */
    /* dispatch(updatePost({
      "title": "Bienvenidos"
    }, "a446b611-1ef0-4290-86f1-d0054655a31a")) */
    /* dispatch(deletePost("a446b611-1ef0-4290-86f1-d0054655a31a")) */
    /* dispatch(likePost("a446b611-1ef0-4290-86f1-d0054655a31a")) */
    //dispatch(getPost("93a1fcac-7b9e-47d3-86c1-9442ceaee3c0"))
    dispatch(getPosts())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* const data = [
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
  ] */

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Grid container spacing={2}>
        {posts && posts.map((e, i) => (
          <Post key={`p${i}`} avatar={e.publisher.avatar} title={e.title} description={e.text} name={`${e.publisher.firstName} ${e.publisher.lastName}`} img={e.images}/>
        ))}
      </Grid>
    </Box>
  )
}

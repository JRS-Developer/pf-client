import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Clear from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDataById } from '../../actions/user'
import { createPost } from '../../actions/post'
import FileUpload from './FileUpload'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import LinearProgress from '@mui/material/LinearProgress'

export default function CreatePost({ getPosts, loading }) {
  const dispatch = useDispatch()
  const { firstName, lastName, avatar } = useSelector(
    (state) => state.usersReducer.dataEdit
  )

  const { claseId, materiaId, schoolId, cicloLectivoId } = useParams()

  const [post, setPost] = useState({
    title: '',
    text: '',
    publisher_id: localStorage.getItem('user'),
    classId: claseId,
    materiaId,
    schoolId,
    cicloLectivoId,
  })

  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])

  useEffect(() => {
    if (images) {
      setPreviewImages(images.map((i) => URL.createObjectURL(i)))
    }
  }, [images])

  useEffect(() => {
    dispatch(getDataById(localStorage.getItem('user')))
  }, [dispatch])

  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  function handleClickImage(e) {
    let arr = [...images]
    arr.splice(e.currentTarget.name, 1)
    setImages(arr)
  }

  function handleClickFile(e) {
    let arr = [...files]
    arr.splice(e.currentTarget.name, 1)
    setFiles(arr)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData()

    for (let key in post) {
      form.append(key, post[key])
    }

    for (let key in images) {
      form.append('myFile', images[key], images[key].name)
    }
    for (let key in files) {
      form.append('myFile', files[key], files[key].name)
    }

    setPost({
      title: '',
      text: '',
      publisher_id: localStorage.getItem('user'),
      classId: claseId,
      materiaId,
      schoolId,
      cicloLectivoId,
    })

    setFiles([])
    setImages([])

    dispatch(await createPost(form))
    dispatch(await getPosts(claseId, materiaId, schoolId, cicloLectivoId))
  }

  return (
    <Grid item xs={12}>
      <Paper
        display="flex"
        align="center"
        sx={{
          p: 1,
          border: 1,
          borderColor: 'primary.main',
          borderRadius: 1,
          flexDirection: 'column',
        }}
      >
        <Box>
          <Box display="flex" sx={{ alignItems: 'center' }}>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={avatar}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
          </Box>
          <Grid container sx={{ width: '80%' }}>
            <Grid item xs={10}>
              <TextField
                label="Titulo..."
                name="title"
                variant="outlined"
                sx={{ mb: 1, mt: 1, width: '100%' }}
                size="small"
                onChange={handleChange}
                value={post.title}
              />
            </Grid>
            <FileUpload
              setFiles={setFiles}
              files={files}
              setImages={setImages}
              images={images}
            />
            <Grid item xs={12}>
              <TextField
                label="Descripción..."
                name="text"
                variant="outlined"
                multiline
                maxRows={5}
                minRows={3}
                size="small"
                sx={{ mb: 1, mt: 1, width: '100%' }}
                onChange={handleChange}
                value={post.text}
              />
            </Grid>
          </Grid>
        </Box>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '80%',
            backgroundColor: 'primary.main',
            borderRadius: 1,
          }}
        >
          {previewImages &&
            previewImages.map((f, i) => {
              return (
                <Card
                  key={`i${i}`}
                  sx={{
                    width: '11.5%',
                    m: '0.5%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton
                    name={i}
                    size="small"
                    sx={{ position: 'absolute', p: 0, m: 0 }}
                    onClick={(e) => handleClickImage(e)}
                  >
                    <Clear
                      sx={{
                        color: 'secondary.light',
                        fontSize: '1rem',
                        p: 0,
                        m: 0,
                      }}
                      stroke="black"
                    />
                  </IconButton>
                  <CardMedia height="65" image={f} alt={i} component="img" />
                </Card>
              )
            })}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '80%',
            backgroundColor: 'primary.main',
            borderRadius: 1,
          }}
        >
          {files &&
            files.map((f, i) => {
              return (
                <Card
                  key={`f${i}`}
                  sx={{
                    width: '11.5%',
                    m: '0.5%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: 65,
                  }}
                >
                  <Grid container sx={{ width: '50%' }}>
                    <Grid item xs={11}></Grid>
                    <Grid item xs={1}>
                      <IconButton
                        name={i}
                        size="small"
                        sx={{ p: 0, m: 0 }}
                        onClick={(e) => handleClickFile(e)}
                      >
                        <Clear
                          sx={{
                            color: 'secondary.light',
                            fontSize: '1rem',
                            p: 0,
                            m: 0,
                          }}
                          stroke="black"
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Typography
                    sx={{ fontSize: '0.7rem', alignSelf: 'center', p: 0, m: 0 }}
                  >
                    {f.name}
                  </Typography>
                </Card>
              )
            })}
        </Grid>
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          sx={{ mb: 1 }}
        >
          Publicar
        </Button>
      </Paper>
      {loading && <LinearProgress sx={{ borderRadius: 1 }} />}
    </Grid>
  )
}




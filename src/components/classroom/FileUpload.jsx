import React from 'react'
import Grid from '@mui/material/Grid'
import AttachFile from '@mui/icons-material/AttachFile'
import CameraAlt from '@mui/icons-material/CameraAlt'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const Input = styled('input')({
  display: 'none',
})

export default function FileUpload({ setFiles, files, setImages, images }) {

  function onFileChange(e) {
    let arr = Array.from(e.target.files)
    setFiles([...files, ...arr])
  }

  function onImageChange(e) {
    let arr = Array.from(e.target.files)
    setImages([...images, ...arr])
  }

  return (
    <>
      <Grid item xs={1}>
      <Tooltip title="Subir imagen" placement='top' arrow>
        <label htmlFor="icon-button-camera">
          <Input
            id="icon-button-camera"
            type="file"
            onChange={onImageChange}
            accept="image/png, image/jpeg"
            multiple
          />

          <IconButton
            color="primary"
            component="span"
            sx={{ height: '100%', p: 0 }}
          >
            <CameraAlt fontSize="large" />
          </IconButton>
        </label>
        </Tooltip>
      </Grid>
      <Grid item xs={1}>
      <Tooltip title="Subir archivo" placement='top' arrow>
        <label htmlFor="icon-button-file">
          <Input
            id="icon-button-file"
            type="file"
            onChange={onFileChange}
            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"
            multiple
          />

          <IconButton
            color="primary"
            component="span"
            sx={{ height: '100%', p: 0 }}
          >
            <AttachFile fontSize="large" />
          </IconButton>
        </label>
        </Tooltip>
      </Grid>
    </>
  )
}
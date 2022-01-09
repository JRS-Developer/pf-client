import React, { useState } from 'react'
import AttachFile from '@mui/icons-material/AttachFile'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import Avatar from '@material-ui/core/Avatar'
import FileUpload from '@mui/icons-material/FileUpload'

const Input = styled('input')({
  display: 'none',
})

export default function HomeworkUploadFile() {
  const [file, setFile] = useState(null)

  function onFileChange(e) {
    setFile(e.target.file)
  }

  function removeFile() {
    setFile(null)
  }

  return (
    <>
      <Tooltip title="Subir archivo" placement="top" arrow>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            aligntItems: 'center',
            justifyContent: 'center',
            ':hover #prueba': {
              opacity: 0.7,
              backgroundColor: 'black',
              transition: 'opacity .5s',
            },
          }}
        >
          <label
            htmlFor="icon-button-file"
            sx={{
              display: 'flex',
              aligntItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Input
              id="icon-button-file"
              type="file"
              onChange={onFileChange}
              accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"
            />

            <IconButton
              id="prueba"
              component="span"
              sx={{
                position: 'absolute',
                zIndex: 1,
                opacity: 0,
                backgroundColor: 'black',
                transition: 'opacity .5s',
                width: '80%',
                height: '80%',
              }}
            >
              <FileUpload sx={{ fontSize: 80, zIndex: 9, opacity: 1 }} />
            </IconButton>
            
              <FilePresentIcon sx={{ height: '80%', width: "80%", p: 0, m: 0 }} />
          </label>
        </Box>
      </Tooltip>
    </>
  )
}

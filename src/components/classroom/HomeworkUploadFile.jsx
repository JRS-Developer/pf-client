import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import FileUpload from '@mui/icons-material/FileUpload'

const Input = styled('input')({
  display: 'none',
})

export default function HomeworkUploadFile({onFileChange, setFile}) {

  // function removeFile() {
  //   setFile(null)
  // }

  return (
    <>
      <Tooltip title="Subir archivo" placement="top" arrow>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <label
            htmlFor="icon-button-file"
          >
            <Input
              id="icon-button-file"
              type="file"
              onChange={onFileChange}
              accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"
            />
            <Box>
            <IconButton
              id="prueba"
              component="span"
            >
              <FileUpload
                sx={{
                  height: '100%',
                  width: '100%',
                  zIndex: 9,
                  opacity: 1,
                  p: 0,
                  m: 0,
                }}
              />
            </IconButton>
            </Box>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
            </Box>
          </label>
        </Box>
        
      </Tooltip>
    </>
  )
}

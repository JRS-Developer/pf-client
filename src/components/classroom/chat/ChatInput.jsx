import { Box, TextField, IconButton } from '@mui/material/'
import Send from '@mui/icons-material/Send'
import { useState } from 'react'
import socket from '../../socket'

/**
 * ChatInput
 *
 * handleSubmit: funcion que es llamada cuando se presiona enter
 * en el campo de texto
 *
 */
const ChatInput = ({ handleSubmit, chatId, fullName }) => {
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setMessage(e.target.value)
    socket.emit('typing', { fullName, chatId })
  }

  return (
    <Box
      sx={{
        top: 'auto',
        bottom: 0,
        width: '100%',
        mt: 3,
      }}
    >
      <form onSubmit={(e) => {
        e.preventDefault()

        handleSubmit(message)
        setMessage('')
      }}>
        <Box
          spacing={0}
          display="flex"
          direction="row"
          sx={{ gap: '1rem', alignItems: 'center' }}
        >
          <TextField
            name="message"
            required
            fullWidth
            id="message"
            placeholder="Escribir nuevo mensaje..."
            autoFocus
            value={message}
            onChange={handleChange}
          />
          <IconButton
            width="15%"
            type="submit"
            disabled={!message.length}
            aria-label="send"
            sx={{
              bgcolor: 'primary.main',
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </form>
    </Box>
  )
}

export default ChatInput

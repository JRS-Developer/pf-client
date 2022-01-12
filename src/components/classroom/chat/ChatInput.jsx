import { Box, TextField, IconButton } from '@mui/material/'
import Send from '@mui/icons-material/Send'
import { useState } from 'react'
import { socketChat } from '../../socket'

/**
 * ChatInput
 *
 * handleSubmit: funcion que es llamada cuando se presiona enter
 * en el campo de texto
 * chatId: id del chat
 * fullName: nombre del usuario
 *
 */
const ChatInput = ({ handleSubmit, chatId, fullName }) => {
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setMessage(e.target.value)
    socketChat.emit('typing', { fullName, chatId })
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
      <form
        onSubmit={(e) => {
          e.preventDefault()

          handleSubmit(message)
          setMessage('')
        }}
      >
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
            autoComplete="off"
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

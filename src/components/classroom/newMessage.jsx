import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container'



const NewMessage = () => {
  

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };


  return (
    
    <Box sx={{ top: 'auto', bottom: 0, bgColor: 'primary.main', width:'100%'}}>
      <form onSubmit={handleSubmit}>
        <Box spacing={0} display='flex' direction="row" sx={{mt: 2}}>
              <TextField
                name="message"
                required
                fullWidth
                id="message"
                placeholder="Escribir nuevo mensaje..."
                autoFocus
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <Button
                variant="contained"
                endIcon={<Icon>send</Icon>}
                width='15%'
                disabled={!message.length}
              >
                Enviar
              </Button>
        </Box>
      </form>
      </Box>
     
  );
};

export default NewMessage;
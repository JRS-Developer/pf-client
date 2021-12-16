import React from "react";
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Post({avatar, title, description, name, img}){

  return(
    <Grid item xs={12}>
            <Box sx={{ width: '95%' }}>
              <Paper display="flex" align="center" sx={{p: 1, border: 1, borderColor: 'primary.main', borderRadius: 2, flexDirection: "column"}}>
                <Box display="flex" sx={{alignItems: 'center', pb: 1}}>
                  <Avatar alt={name} src={avatar} sx={{ width: 24, height: 24, mr: 1 }}/>
                  <Typography variant="subtitle1">{name}</Typography>
                </Box>
                <Box sx={{width: "50%", pb: 1,}}>
                  <img src={img} alt={title} styles={{objectFit: "cover"}} />
                </Box>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
              </Paper>
            </Box>
          </Grid>
  )
}
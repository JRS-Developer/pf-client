import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Close, Save } from '@mui/icons-material';

const ModuleForm =  ({open, handleClose, titleForm, dataForm}) => {
  const [rowModule, setRowModule] = React.useState(dataForm);

  const handleChange = (e) => {
    setRowModule({
      ...rowModule, [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`sm`}
        fullWidth={`sm`}
        scroll='paper'
      >
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <TextField id="outlined-basic" variant="standard" type="hidden" value={rowModule.id}/>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  value={rowModule.name}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="onclick"
                  margin="dense"
                  id="url"
                  label="Url"
                  type="text"
                  value={rowModule.url}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="action_param"
                  margin="dense"
                  id="action_param"
                  label="Action Param"
                  type="text"
                  value={rowModule.icon}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                />
              </Grid>

            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} endIcon={<Save />}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose} startIcon={<Close />}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModuleForm
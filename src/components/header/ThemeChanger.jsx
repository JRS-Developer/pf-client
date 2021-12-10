import React from "react";
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

export default function ThemeChanger({setTheme}){

  const [selectedValue, setSelectedValue] = React.useState('GaiaTheme');
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  
  const handleChangeTheme = (event) => {
    setName(event.target.name)
    setSelectedValue(event.target.value);
    setTheme(event.target.value)
    setOpen(true)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return(
    <Stack spacing={0}>
      Temas:
        <Grid container rowSpacing={0} columnSpacing={0} justify="center">
          <Grid item xs={4} align="center">
            <Tooltip title="Gaia" placement='top' arrow followCursor>
              <Radio
                sx={{p: 0, m: 0}}
                checked={selectedValue === 'GaiaTheme'}
                onChange={handleChangeTheme}
                value="GaiaTheme"
                name="Gaia"
                inputProps={{ 'aria-label': 'A' }}
              />
              </Tooltip>
          </Grid>
          <Grid item xs={4} align="center">
            <Tooltip title="Hermes" placement='top' arrow followCursor>
                <Radio
                  sx={{p: 0, m: 0}}
                  checked={selectedValue === 'HermesTheme'}
                  onChange={handleChangeTheme}
                  value="HermesTheme"
                  name="Hermes"
                  inputProps={{ 'aria-label': 'C' }}
                />
              </Tooltip>
          </Grid>
          <Grid item xs={4} align="center">
            <Tooltip title="Hecate" placement='top' arrow followCursor>
                <Radio
                  sx={{p: 0, m: 0}}
                  checked={selectedValue === 'HecateTheme'}
                  onChange={handleChangeTheme}
                  value="HecateTheme"
                  name="Hecate"
                  inputProps={{ 'aria-label': 'D' }}
                />
              </Tooltip>
          </Grid>
          </Grid>
          <Grid container rowSpacing={0} columnSpacing={0} justify="center">
          <Grid item xs={4} align="center">
            <Tooltip title="Afrodita" placement='top' arrow followCursor>
                <Radio
                  sx={{p: 0, m: 0}}
                  checked={selectedValue === 'AfroditaTheme'}
                  onChange={handleChangeTheme}
                  value="AfroditaTheme"
                  name="Afrodita"
                  inputProps={{ 'aria-label': 'E' }}
                />
              </Tooltip>
          </Grid>
          <Grid item xs={4} align="center">
            <Tooltip title="Poseidon" placement='top' arrow followCursor>
                <Radio
                  sx={{p: 0, m: 0}}
                  checked={selectedValue === 'PoseidonTheme'}
                  onChange={handleChangeTheme}
                  value="PoseidonTheme"
                  name="Poseidon"
                  inputProps={{ 'aria-label': 'F' }}
                />
              </Tooltip>
          </Grid>
          <Grid item xs={4} align="center">
              <Tooltip title="Zeus" placement='top' arrow followCursor>
                <Radio
                  sx={{p: 0, m: 0}}
                  checked={selectedValue === 'ZeusTheme'}
                  onChange={handleChangeTheme}
                  value="ZeusTheme"
                  name="Zeus"
                  inputProps={{ 'aria-label': 'G' }}
                />
              </Tooltip>
          </Grid>
          {/* <Grid item xs={3} align="center">
              <Radio
                sx={{p: 0, m: 0}}
                checked={selectedValue === 'GaiaDarkTheme'}
                onChange={handleChangeTheme}
                value="GaiaDarkTheme"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'H' }}
              />
          </Grid> */}
          </Grid>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={`Cambiaste el tema a ${name}`}
            action={action}
          />
          </Stack>
  )
}
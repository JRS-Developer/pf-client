import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Tooltip from '@mui/material/Tooltip'
import BubbleChart from '@mui/icons-material/BubbleChart'

export default function ThemeChanger({ setTheme }) {
  const [selectedValue, setSelectedValue] = React.useState(
    localStorage.getItem('theme') || 'GaiaTheme'
  )
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState('')

  const handleChangeTheme = (event) => {
    setName(event.target.name)
    setSelectedValue(event.target.value)
    localStorage.setItem('theme', event.target.value)
    setTheme(localStorage.getItem('theme'))
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

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
  )

  return (
    <Stack spacing={0}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedValue !== 'GaiaTheme' && (
            <BubbleChart
              sx={{ position: 'absolute', color: '#0367A6', fontSize: 26 }}
            />
          )}
          <Tooltip title="Gaia" placement="top" arrow followCursor>
            <Radio
              sx={{
                p: 0,
                m: 0,
                '& .MuiSvgIcon-root': {
                  fontSize: 35,
                },
                color: '#668C4A',
              }}
              checked={selectedValue === 'GaiaTheme'}
              onChange={handleChangeTheme}
              value="GaiaTheme"
              name="Gaia"
              inputProps={{ 'aria-label': 'A' }}
            />
          </Tooltip>
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ m: 0, ml: 0.5 }}
        >
          GAIA
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedValue !== 'HermesTheme' && (
            <BubbleChart
              sx={{ position: 'absolute', color: '#e47f25', fontSize: 26 }}
            />
          )}
          <Tooltip title="Hermes" placement="top" arrow followCursor>
            <Radio
              sx={{
                p: 0,
                m: 0,
                '& .MuiSvgIcon-root': {
                  fontSize: 35,
                },
                color: '#A4222E',
              }}
              checked={selectedValue === 'HermesTheme'}
              onChange={handleChangeTheme}
              value="HermesTheme"
              name="Hermes"
              inputProps={{ 'aria-label': 'C' }}
            />
          </Tooltip>
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ m: 0, ml: 0.5 }}
        >
          HERMES
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedValue !== 'HecateTheme' && (
            <BubbleChart
              sx={{ position: 'absolute', color: '#5E83F2', fontSize: 26 }}
            />
          )}
          <Tooltip title="Hecate" placement="top" arrow followCursor>
            <Radio
              sx={{
                p: 0,
                m: 0,
                '& .MuiSvgIcon-root': {
                  fontSize: 35,
                },
                color: '#38124D',
              }}
              checked={selectedValue === 'HecateTheme'}
              onChange={handleChangeTheme}
              value="HecateTheme"
              name="Hecate"
              inputProps={{ 'aria-label': 'D' }}
            />
          </Tooltip>
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ m: 0, ml: 0.5 }}
        >
          HECATE
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedValue !== 'AfroditaTheme' && (
            <BubbleChart
              sx={{ position: 'absolute', color: '#BF5A36', fontSize: 26 }}
            />
          )}
          <Tooltip title="Afrodita" placement="top" arrow followCursor>
            <Radio
              sx={{
                p: 0,
                m: 0,
                '& .MuiSvgIcon-root': {
                  fontSize: 35,
                },
                color: '#8C0F4A',
              }}
              checked={selectedValue === 'AfroditaTheme'}
              onChange={handleChangeTheme}
              value="AfroditaTheme"
              name="Afrodita"
              inputProps={{ 'aria-label': 'E' }}
            />
          </Tooltip>
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ m: 0, ml: 0.5 }}
        >
          AFRODITA
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedValue !== 'PoseidonTheme' && (
            <BubbleChart
              sx={{ position: 'absolute', color: '#87D5D0', fontSize: 26 }}
            />
          )}
          <Tooltip title="Poseidon" placement="top" arrow followCursor>
            <Radio
              sx={{
                p: 0,
                m: 0,
                '& .MuiSvgIcon-root': {
                  fontSize: 35,
                },
                color: '#388cad',
              }}
              checked={selectedValue === 'PoseidonTheme'}
              onChange={handleChangeTheme}
              value="PoseidonTheme"
              name="Poseidon"
              inputProps={{ 'aria-label': 'F' }}
            />
          </Tooltip>
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ m: 0, ml: 0.5 }}
        >
          POSEIDON
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedValue !== 'ZeusTheme' && (
            <BubbleChart
              sx={{ position: 'absolute', color: '#EEE343', fontSize: 26 }}
            />
          )}
          <Tooltip title="Zeus" placement="top" arrow followCursor>
            <Radio
              sx={{
                p: 0,
                m: 0,
                '& .MuiSvgIcon-root': {
                  fontSize: 35,
                },
                color: '#313C3F',
              }}
              checked={selectedValue === 'ZeusTheme'}
              onChange={handleChangeTheme}
              value="ZeusTheme"
              name="Zeus"
              inputProps={{ 'aria-label': 'G' }}
            />
          </Tooltip>
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ m: 0, ml: 0.5 }}
        >
          ZEUS
        </Typography>
      </Box>

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

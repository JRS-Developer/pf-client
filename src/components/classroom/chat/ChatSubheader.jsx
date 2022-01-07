import {
  Box,
  Typography,
  ListSubheader,
  IconButton,
  Tooltip,
} from '@mui/material/'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import CloseIcon from '@mui/icons-material/Close'

const Subheader = ({ typing, handleClick, open }) => (
  <ListSubheader
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Box>
      <Typography variant="h6" component="p" sx={{ p: 2, pl: 0 }}>
        Inbox
      </Typography>
      {typing && (
        <Typography variant="body2" sx={{ p: 1, pl: 0, pr: 2 }}>
          {typing}
        </Typography>
      )}
    </Box>
    <Tooltip title={open ? 'Cerrar' : 'Mostrar usuarios'}>
      <IconButton onClick={handleClick}>
        {open ? <CloseIcon /> : <PeopleAltIcon />}
      </IconButton>
    </Tooltip>
  </ListSubheader>
)

export default Subheader

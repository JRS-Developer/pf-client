import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#668C4A',
    },
    secondary: {
      main: '#0367A6',
    },
    info: {
      main: '#846699',
    },
  },
});

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#668C4A',
    },
    secondary: {
      main: '#0367A6',
    },
    info: {
      main: '#846699',
    },
  },
});
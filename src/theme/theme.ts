import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
  // We largely rely on CSS variables, but we configure MUI to play nice
  let theme = createTheme({
    palette: {
      mode,
      primary: { main: '#ffffff' }, // Neutral to let CSS vars take over
      background: {
        default: 'transparent',
        paper: 'transparent',
      },
      text: {
        primary: mode === 'dark' ? '#e0e0e0' : '#1a1a1a',
        secondary: mode === 'dark' ? '#a0a0a0' : '#555555',
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      h1: { fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase' },
      h2: { fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase' },
      h3: { fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase' },
      button: { 
        fontFamily: '"Inter", sans-serif', 
        textTransform: 'uppercase', 
        letterSpacing: '1px' 
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            padding: '10px 20px',
            border: '1px solid var(--text-main)',
            color: 'var(--text-main)',
            '&:hover': {
              backgroundColor: 'var(--text-main)',
              color: 'var(--bg-color)',
            }
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'var(--nav-blur)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
            borderBottom: '1px solid var(--border)',
            color: 'var(--text-main)',
          },
        },
      },
    },
  });
  return responsiveFontSizes(theme);
};

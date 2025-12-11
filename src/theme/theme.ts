import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#00a8e8', // Tech Blue
      },
      secondary: {
        main: '#ff6b6b', // Coral Accent
      },
      background: {
        default: mode === 'dark' ? '#0d1b2a' : '#f4f6f8',
        paper: mode === 'dark' ? '#1b263b' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: 16, // M3 rounded corners
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark' 
              ? '0 4px 20px rgba(0,0,0,0.5)' 
              : '0 4px 20px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'dark'
                ? '0 8px 30px rgba(0,0,0,0.6)'
                : '0 8px 30px rgba(0,0,0,0.1)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === 'dark' ? 'rgba(13, 27, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
            borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
          },
        },
      },
    },
  });
  return responsiveFontSizes(theme);
};

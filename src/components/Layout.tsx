import { ReactNode, useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container, Switch, Link as MuiLink } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeColor } from '../App';

interface LayoutProps {
  children: ReactNode;
  themeColor: ThemeColor;
  setThemeColor: (t: ThemeColor) => void;
  isLightMode: boolean;
  toggleLightMode: () => void;
}

export default function Layout({ children, themeColor, setThemeColor, isLightMode, toggleLightMode }: LayoutProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close settings when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    }
    if (settingsOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);

  const ThemeCircle = ({ color, value }: { color: string, value: ThemeColor }) => (
    <Box
      onClick={() => setThemeColor(value)}
      sx={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        bgcolor: color,
        cursor: 'pointer',
        border: themeColor === value ? '2px solid var(--accent)' : '2px solid transparent',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.1)' }
      }}
    />
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <AppBar position="fixed" sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              fontFamily: '"Oswald", sans-serif',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'var(--accent)',
              fontSize: '1.2rem'
            }}
          >
            Tech Without Drama
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {['Blog', 'Upcoming', 'Contact'].map((text) => (
                <MuiLink 
                  key={text}
                  component={RouterLink} 
                  to={`/${text.toLowerCase()}`}
                  sx={{ 
                    color: 'var(--text-sub)', 
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    '&:hover': { color: 'var(--accent)' }
                  }}
                >
                  {text}
                </MuiLink>
              ))}
            </Box>

            <IconButton 
              onClick={() => setSettingsOpen(true)} 
              sx={{ color: 'var(--text-main)' }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Settings Panel */}
      {settingsOpen && (
        <Box
          ref={panelRef}
          sx={{
            position: 'fixed',
            top: 80,
            right: 20,
            width: 280,
            bgcolor: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            p: 3,
            boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
            zIndex: 1200,
            animation: 'fadeUp 0.3s forwards'
          }}
        >
          <Typography variant="overline" sx={{ color: 'var(--text-sub)', borderBottom: '1px solid var(--border)', display: 'block', mb: 2 }}>
            Theme Colors
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <ThemeCircle color="#222" value="theme-noir" />
            <ThemeCircle color="#1f263b" value="theme-navy" />
            <ThemeCircle color="#3d3630" value="theme-brown" />
            <ThemeCircle color="#2f3d3d" value="theme-sage" />
          </Box>

          <Typography variant="overline" sx={{ color: 'var(--text-sub)', borderBottom: '1px solid var(--border)', display: 'block', mb: 2 }}>
            Appearance
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="var(--text-main)">Light Mode</Typography>
            <Switch checked={isLightMode} onChange={toggleLightMode} color="default" />
          </Box>
        </Box>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, pt: 12, pb: 8 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <Container>
          <Typography variant="body2" sx={{ color: 'var(--text-sub)' }}>
            © {new Date().getFullYear()} Tech Without Drama. Visual Blog Edition.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

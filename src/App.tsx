import { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { getTheme } from './theme/theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Upcoming from './pages/Upcoming';
import Contact from './pages/Contact';

export type ThemeColor = 'theme-noir' | 'theme-navy' | 'theme-brown' | 'theme-sage';

function App() {
  // State for Color Theme
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem('selectedTheme') as ThemeColor) || 'theme-noir';
  });

  // State for Light/Dark Mode
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('lightMode') === 'true';
  });

  // Apply classes to Body
  useEffect(() => {
    document.body.className = themeColor;
    if (isLightMode) {
      document.body.classList.add('light-mode');
    }
    
    localStorage.setItem('selectedTheme', themeColor);
    localStorage.setItem('lightMode', String(isLightMode));
  }, [themeColor, isLightMode]);

  const toggleLightMode = () => setIsLightMode(!isLightMode);
  
  // MUI Theme Bridge
  const muiTheme = useMemo(() => getTheme(isLightMode ? 'light' : 'dark'), [isLightMode]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Layout 
          themeColor={themeColor} 
          setThemeColor={setThemeColor} 
          isLightMode={isLightMode} 
          toggleLightMode={toggleLightMode}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { VoiceRecorder } from './components/VoiceRecorder';
import { FAQ } from './pages/FAQ';
import { HelmetProvider } from 'react-helmet-async';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recorder" element={<VoiceRecorder />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
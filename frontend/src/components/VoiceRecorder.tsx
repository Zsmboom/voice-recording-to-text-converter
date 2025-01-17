import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  CircularProgress, 
  Snackbar, 
  Alert, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import LanguageIcon from '@mui/icons-material/Language';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSpeechRecognition, SUPPORTED_LANGUAGES } from '../hooks/useSpeechRecognition';
import { processText } from '../services/api';

const RecorderContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const TextContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '500px',
  overflowY: 'auto',
  backgroundColor: theme.palette.grey[50],
}));

const MarkdownContainer = styled(Box)(({ theme }) => ({
  '& h1': {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  '& h2': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  '& h3': {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.6,
  },
  '& ul, & ol': {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  '& li': {
    marginBottom: theme.spacing(1),
  },
}));

export const VoiceRecorder: React.FC = () => {
  const { 
    text, 
    isListening, 
    startListening, 
    stopListening, 
    hasRecognitionSupport,
    selectedLanguage,
    setSelectedLanguage,
    setText,
  } = useSpeechRecognition();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedText, setProcessedText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleStartRecording = () => {
    setText('');
    setProcessedText('');
    setError('');
    startListening();
  };

  const handleStopRecording = async () => {
    if (!text.trim()) {
      setError('No text recorded. Please try again.');
      return;
    }

    stopListening();
    setIsProcessing(true);
    
    try {
      const result = await processText(text);
      setProcessedText(result);
    } catch (err) {
      setError('Error processing text. Please try again.');
      console.error('处理文本时出错:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!hasRecognitionSupport) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Your browser doesn't support voice recognition. Please use the latest version of Chrome.
        </Typography>
      </Box>
    );
  }

  return (
    <RecorderContainer elevation={3}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Voice Recorder
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          {/* Language Selector */}
          <FormControl sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel id="language-select-label">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon fontSize="small" />
                Recognition Language
              </Box>
            </InputLabel>
            <Select
              labelId="language-select-label"
              value={selectedLanguage.code}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LanguageIcon fontSize="small" />
                  Recognition Language
                </Box>
              }
              onChange={(e) => {
                const lang = SUPPORTED_LANGUAGES.find(l => l.code === e.target.value);
                if (lang) setSelectedLanguage(lang);
              }}
              disabled={isListening}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name} ({lang.localName})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Recording Controls */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MicIcon />}
              onClick={handleStartRecording}
              disabled={isListening || isProcessing}
            >
              Start Recording
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<StopIcon />}
              onClick={handleStopRecording}
              disabled={!isListening || isProcessing}
            >
              Stop Recording
            </Button>
          </Box>
        </Box>

        {isListening && (
          <Typography color="primary" sx={{ mt: 2 }}>
            Recording in {selectedLanguage.name}...
          </Typography>
        )}

        {isProcessing && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={20} />
            <Typography>Processing...</Typography>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Original Text
          </Typography>
          <TextContainer>
            <Typography variant="body1">
              {text || `Start speaking in ${selectedLanguage.name}...`}
            </Typography>
          </TextContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Optimized Text
          </Typography>
          <TextContainer>
            <MarkdownContainer>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {processedText || 'Processed text will appear here...'}
              </ReactMarkdown>
            </MarkdownContainer>
          </TextContainer>
        </Grid>
      </Grid>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </RecorderContainer>
  );
}; 
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
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import LanguageIcon from '@mui/icons-material/Language';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
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
    clearText,
  } = useSpeechRecognition();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedText, setProcessedText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isPaused, setIsPaused] = useState(false);

  const handleStartRecording = () => {
    clearText();
    setProcessedText('');
    setError('');
    setIsPaused(false);
    startListening();
  };

  const handlePauseRecording = () => {
    stopListening();
    setIsPaused(true);
  };

  const handleContinueRecording = () => {
    setIsPaused(false);
    startListening();
  };

  const handleAISummarize = async () => {
    // 先停止录音
    stopListening();
    setIsPaused(false);

    // 检查文本是否为空
    if (!text.trim()) {
      setError('No text recorded. Please try again.');
      return;
    }

    console.log('Starting AI summarization with text:', text);

    // 开始处理文本
    setIsProcessing(true);
    setProcessedText(''); // 清空之前的处理结果
    setError(''); // 清空错误信息
    
    try {
      await processText(text, (partialText, isLast) => {
        console.log('Received response:', { partialText, isLast });
        
        if (partialText) {
          console.log('Setting processed text:', {
            length: partialText.length,
            content: partialText,
            isLast
          });
          
          // 更新状态
          setProcessedText(partialText);
          
          if (isLast) {
            console.log('Final text set, processing complete');
            setIsProcessing(false);
          }
        }
      });
      
      // 如果处理完成但 isLast 没有被正确设置，确保更新状态
      setIsProcessing(false);
    } catch (err) {
      console.error('Error in handleAISummarize:', err);
      setError('Error processing text. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleDownloadWord = () => {
    if (!processedText.trim()) {
      setError('没有可下载的内容。请先录制并处理文本。');
      return;
    }

    // 将 Markdown 转换为 Word 适用的 HTML 格式
    const convertMarkdownToHtml = (markdown: string) => {
      // 处理标题
      let html = markdown
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>');

      // 处理列表
      html = html
        .replace(/^\s*[-*+]\s+(.*)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

      // 处理段落
      html = html
        .replace(/^(?!<[h|u|o])(.*$)/gm, '<p>$1</p>')
        .replace(/\n\n/g, '');

      return html;
    };

    // 创建一个包含样式的HTML文档
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; }
            h1 { font-size: 24px; color: #333; margin-bottom: 20px; }
            h2 { font-size: 20px; color: #444; margin-top: 20px; }
            h3 { font-size: 16px; color: #555; margin-top: 15px; }
            p { margin-bottom: 10px; }
            ul { margin-left: 20px; margin-bottom: 15px; }
            li { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          ${convertMarkdownToHtml(processedText)}
        </body>
      </html>
    `;

    // 创建Blob对象
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'voice-recording.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    if (!processedText.trim()) {
      setError('没有可下载的内容。请先录制并处理文本。');
      return;
    }

    const blob = new Blob([processedText], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'voice-recording.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const renderOptimizedText = () => {
    console.log('Rendering optimized text:', {
      isProcessing,
      hasProcessedText: !!processedText,
      processedTextLength: processedText.length,
      processedTextContent: processedText,
      markdownPluginsLoaded: true
    });

    if (isProcessing) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', height: '100%' }}>
          <CircularProgress size={20} />
          <Typography>Processing text...</Typography>
        </Box>
      );
    }

    if (processedText) {
      console.log('Attempting to render markdown with text:', processedText);
      return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {processedText}
        </ReactMarkdown>
      );
    }

    return (
      <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
        Processed text will appear here...
      </Typography>
    );
  };

  console.log('Current state:', {
    isProcessing,
    hasProcessedText: !!processedText,
    processedTextLength: processedText.length,
    isListening,
    isPaused
  });

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
              disabled={isListening || isPaused}
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
            {!isListening && !isPaused && !isProcessing && !text.trim() && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<MicIcon />}
                onClick={handleStartRecording}
              >
                Start Recording
              </Button>
            )}
            {isListening && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PauseIcon />}
                  onClick={handlePauseRecording}
                  disabled={isProcessing}
                >
                  Pause Recording
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AutoFixHighIcon />}
                  onClick={handleAISummarize}
                  disabled={isProcessing}
                >
                  AI Summarize
                </Button>
              </>
            )}
            {isPaused && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlayArrowIcon />}
                  onClick={handleContinueRecording}
                  disabled={isProcessing}
                >
                  Continue Recording
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AutoFixHighIcon />}
                  onClick={handleAISummarize}
                  disabled={isProcessing}
                >
                  AI Summarize
                </Button>
              </>
            )}
          </Box>
        </Box>

        {isListening && (
          <Typography color="primary" sx={{ mt: 2 }}>
            Recording in {selectedLanguage.name}...
          </Typography>
        )}

        {isPaused && (
          <Typography color="secondary" sx={{ mt: 2 }}>
            Recording paused. Click Continue to resume or AI Summarize to process.
          </Typography>
        )}

        {isProcessing && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={20} />
            <Typography>Processing text...</Typography>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">
              Optimized Text
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DescriptionIcon />}
                onClick={handleDownloadWord}
                disabled={!processedText.trim() || isProcessing}
                color="primary"
              >
                下载Word
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ArticleIcon />}
                onClick={handleDownloadMarkdown}
                disabled={!processedText.trim() || isProcessing}
                color="primary"
              >
                下载MD
              </Button>
            </Box>
          </Box>
          <TextContainer>
            <MarkdownContainer>
              {renderOptimizedText()}
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
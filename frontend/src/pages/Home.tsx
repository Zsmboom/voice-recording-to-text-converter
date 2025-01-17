import { Container, Typography, Box, Paper, Grid, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: 'How can I convert voice recording to text?',
    answer: 'Simply press the Start Recording button and begin expressing your thoughts and ideas freely - speak about whatever comes to mind. When you\'re done, click Stop Recording, and you\'ll receive a well-organized article with clear logical flow. VoiceRecordingEasy goes beyond simple voice-to-text conversion; we help transform your spoken words into a polished, structured article.'
  },
  {
    question: 'Is voice recording to text converter free?',
    answer: 'Yes, VoiceRecordingEasy is completely free for everyone to use. All your content is stored locally on your device, and we don\'t upload any information to external servers. Your privacy and data security are our top priorities.'
  },
  {
    question: 'Is voice recording to text converter free download?',
    answer: 'Yes, you can easily download your converted text. You can either copy the text directly to your clipboard, or download it as a Word document or Markdown file format for your convenience.'
  },
  {
    question: 'How can I improve recognition accuracy?',
    answer: '1. Use a quality microphone\n2. Choose a quiet environment\n3. Speak at a moderate pace\n4. Pronounce words clearly\n5. Avoid background noise'
  },
  {
    question: 'What does the AI text optimization do?',
    answer: 'Sometimes we have ideas we want to record, but these thoughts might be unpolished, with many pauses, filler words, and interweaving viewpoints that make the voice recording messy. Our AI not only captures these thoughts but also organizes them into a logically coherent article without removing any content. It\'s like having a personal editor who understands your stream of consciousness and transforms it into a well-structured piece that better represents your ideas.'
  },
  {
    question: 'Is long-duration recording supported?',
    answer: 'Yes, the system supports long-duration recording. However, we recommend breaking longer content into multiple segments for better quality control and processing.'
  },
  {
    question: 'Which languages can I convert voice recording to text?',
    answer: 'Currently, we support the following languages:\n1. English (US)\n2. English (UK)\n3. English (Australia)\n4. English (India)\n5. Chinese (Mandarin)\n6. Chinese (Cantonese)\n7. Japanese\n8. Korean\n9. Spanish\n10. French\n11. German\n12. Italian\n13. Portuguese\n14. Russian\n15. Hindi'
  }
];

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>VoiceRecordingEasy - Voice Recording to Text Converter Online Free</title>
        <meta name="description" content="VoiceRecordingEasy uses advanced AI technology to transform your spoken words into well-structured, logically organized articles. Our intelligent system not only converts voice to text but also enhances the content with clear organization and improved readability." />
        <meta name="keywords" content="VoiceRecordingEasy, voice recording to text converter online free, ai recording to text, speech to text AI, audio transcription, voice recognition, speech recognition, text transcription, audio to text converter, AI writing assistant" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="VoiceRecordingEasy" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "VoiceRecordingEasy",
              "applicationCategory": "BusinessApplication",
              "description": "Transform your spoken words into well-structured articles with AI-powered organization and clarity. VoiceRecordingEasy uses advanced AI to convert voice recordings into logically organized, readable content.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "operatingSystem": "Web Browser"
            }
          `}
        </script>
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(120deg, #1976d2 0%, #0d47a1 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2 
                }}
              >
                VoiceRecordingEasy
              </Typography>
              <Typography variant="h2" 
                sx={{ 
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 400,
                  mb: 4,
                  opacity: 0.9
                }}
              >
                Transform your spoken words into well-structured articles with AI-powered organization and clarity
              </Typography>
              <Button
                component={RouterLink}
                to="/recorder"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                  },
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Start Recording Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                src="/images/voice-to-text-hero.svg"
                alt="AI-powered voice to text conversion illustration showing a modern microphone transforming speech waves into digital text"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: 400,
                  filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <SpeedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" component="div" sx={{ mb: 1 }}>95%+</Typography>
              <Typography>Recognition Accuracy</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" component="div" sx={{ mb: 1 }}>100%</Typography>
              <Typography>Secure Processing</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <AutoFixHighIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" component="div" sx={{ mb: 1 }}>AI</Typography>
              <Typography>Smart Optimization</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section with Images */}
      <Box sx={{ bgcolor: 'grey.50', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            Powerful Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
                elevation={2}
              >
                <Box
                  component="img"
                  src="/images/realtime-recognition.svg"
                  alt="Real-time voice recognition illustration"
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <MicIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
                <Typography variant="h5" gutterBottom>
                  Real-time Recognition
                </Typography>
                <Typography color="text.secondary">
                  High-accuracy, fast-response voice recognition with instant feedback
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
                elevation={2}
              >
                <Box
                  component="img"
                  src="/images/smart-formatting.svg"
                  alt="Smart text formatting illustration"
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <TextFieldsIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
                <Typography variant="h5" gutterBottom>
                  Smart Formatting
                </Typography>
                <Typography color="text.secondary">
                  Automatic paragraph breaks and punctuation for clear text structure
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
                elevation={2}
              >
                <Box
                  component="img"
                  src="/images/ai-enhancement.svg"
                  alt="AI text enhancement illustration"
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <AutoFixHighIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
                <Typography variant="h5" gutterBottom>
                  AI Enhancement
                </Typography>
                <Typography color="text.secondary">
                  Advanced AI technology to optimize text quality and readability
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How it Works Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
          How It Works
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }} elevation={2}>
              <Typography variant="h5" gutterBottom color="primary">
                Quick Start Guide
              </Typography>
              <Box component="ol" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  Click "Record" to enter the recording page
                </Typography>
                <Typography component="li" paragraph>
                  Click the "Start Recording" button and speak
                </Typography>
                <Typography component="li" paragraph>
                  Watch as your speech appears as text in real-time
                </Typography>
                <Typography component="li">
                  Click "Stop Recording" for AI text optimization
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }} elevation={2}>
              <Typography variant="h5" gutterBottom color="primary">
                Best Practices
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" paragraph>
                  Use Chrome browser for best experience
                </Typography>
                <Typography component="li" paragraph>
                  Ensure microphone access is granted
                </Typography>
                <Typography component="li" paragraph>
                  Record in a quiet environment
                </Typography>
                <Typography component="li">
                  Speak clearly at a moderate pace
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            Frequently Asked Questions
          </Typography>
          <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <Accordion key={index} elevation={2}>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}
                >
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    style={{ whiteSpace: 'pre-line' }}
                    color="text.secondary"
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Transform your voice into perfectly formatted text with just one click.
          </Typography>
          <Button
            component={RouterLink}
            to="/recorder"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Try It Now - It's Free
          </Button>
        </Container>
      </Box>
    </>
  );
}; 
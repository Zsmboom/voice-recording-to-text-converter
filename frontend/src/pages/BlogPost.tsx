import React from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Paper,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  title: string;
  content: string;
  date: string;
  tags: string[];
  readTime: string;
  author: string;
  authorTitle: string;
}

type BlogPosts = {
  [key: number]: BlogPost;
};

// Mock article details
const MOCK_POST_DETAILS: BlogPosts = {
  1: {
    title: 'Why I Created VoiceRecordingEasy: Transforming Scattered Thoughts into Structured Content',
    content: `
Have you ever had a brilliant idea while driving, walking, or working alone, but by the time you could write it down, the essence of that thought was lost? This common challenge led me to create VoiceRecordingEasy, a tool that goes beyond simple voice recording to help capture and organize your thoughts effectively.

## The Problem with Traditional Voice Recording

### Scattered Thoughts
When inspiration strikes, our thoughts often come in a non-linear fashion:
- Ideas flow randomly
- Connections aren't immediately clear
- Important details mix with tangential thoughts
- The structure emerges gradually

### Limited Tools
Traditional voice recording tools have significant limitations:
- They only capture raw audio
- Basic transcription without organization
- No help in structuring content
- Missing context and connections

## The Birth of VoiceRecordingEasy

### Personal Need
Working alone often means being your own sounding board:
- Need to capture ideas quickly
- Want to refine thoughts later
- Require organization and structure
- Seek clarity from chaos

### Beyond Simple Recording
I envisioned a tool that would:
- Record your voice naturally
- Convert speech to text accurately
- Organize content intelligently
- Suggest improvements and additions

## Real-World Use Cases

### While Driving
- Capture business ideas safely
- Record meeting preparations
- Remember tasks and to-dos
- Plan upcoming projects

### During Solo Work
- Document problem-solving processes
- Record technical solutions
- Draft content outlines
- Capture research findings

### Creative Moments
- Record story ideas
- Capture blog post concepts
- Document design inspiration
- Save creative solutions

## How It Works

### Smart Recording
- Speak naturally and freely
- No need for perfect structure
- Express ideas as they come
- Focus on content, not organization

### AI-Powered Organization
- Automatic content structuring
- Logical flow creation
- Topic categorization
- Contextual enhancement

### Content Enhancement
- Identifies missing information
- Suggests additional points
- Maintains context
- Improves clarity

## Beyond Basic Transcription

### Intelligent Processing
VoiceRecordingEasy doesn't just convert voice to text; it:
- Analyzes content relationships
- Identifies key themes
- Creates logical structure
- Suggests expansions

### Content Refinement
The system helps by:
- Organizing scattered thoughts
- Creating clear sections
- Adding relevant subpoints
- Maintaining natural flow

## Future Vision

### Continuous Improvement
We're working on:
- Enhanced context understanding
- Better structure recognition
- More detailed suggestions
- Improved organization logic

### Personal Assistant
Our goal is to create:
- Your thinking partner
- Content organization helper
- Ideas refinement assistant
- Writing improvement tool

## Conclusion

VoiceRecordingEasy was born from a personal need to capture and organize thoughts effectively. Whether you're driving, working alone, or simply need to record ideas quickly, this tool helps transform your scattered thoughts into well-structured, useful content.

Remember, great ideas can come at any time. With VoiceRecordingEasy, you're always ready to capture and organize them effectively.`,
    date: '2024-01-19',
    tags: ['Product Story', 'AI Technology', 'Productivity'],
    readTime: '7 min read',
    author: 'Shimin Zhang',
    authorTitle: 'Creator of VoiceRecordingEasy'
  }
};

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = MOCK_POST_DETAILS[Number(id)];

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5" color="error" align="center">
          Article not found
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/blog')}
          >
            Back to Blog
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - VoiceRecordingEasy Blog</title>
        <meta name="description" content={post.content.substring(0, 155)} />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Breadcrumb navigation */}
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/blog" color="inherit">
            Blog
          </Link>
          <Typography color="text.primary">{post.title}</Typography>
        </Breadcrumbs>

        <Paper elevation={2} sx={{ p: { xs: 3, md: 6 } }}>
          {/* Article title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 4,
              color: 'primary.main'
            }}
          >
            {post.title}
          </Typography>

          {/* Article metadata */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {post.date}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {post.readTime}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    color: 'primary.main'
                  }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Author information */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.authorTitle}
            </Typography>
          </Box>

          {/* Article content */}
          <Box sx={{
            '& h1': {
              fontSize: '2rem',
              fontWeight: 700,
              mb: 4,
              color: 'primary.main'
            },
            '& h2': {
              fontSize: '1.5rem',
              fontWeight: 600,
              mb: 3,
              mt: 4
            },
            '& h3': {
              fontSize: '1.25rem',
              fontWeight: 600,
              mb: 2,
              mt: 3
            },
            '& p': {
              mb: 2,
              lineHeight: 1.7
            },
            '& ul, & ol': {
              mb: 3,
              pl: 3
            },
            '& li': {
              mb: 1
            }
          }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Back button */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              component={RouterLink}
              to="/blog"
              size="large"
            >
              Back to Blog
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}; 
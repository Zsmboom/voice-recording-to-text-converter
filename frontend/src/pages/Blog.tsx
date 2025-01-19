import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Pagination,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Mock blog data
const MOCK_POSTS = [
  {
    id: 1,
    title: 'Why I Created VoiceRecordingEasy: Transforming Scattered Thoughts into Structured Content',
    summary: 'Have you ever had a brilliant idea while driving, walking, or working alone, but by the time you could write it down, the essence of that thought was lost? This common challenge led me to create VoiceRecordingEasy, a tool that goes beyond simple voice recording to help capture and organize your thoughts effectively.',
    date: '2024-01-19',
    tags: ['Product Story', 'AI Technology', 'Productivity'],
    readTime: '7 min read'
  }
];

const ITEMS_PER_PAGE = 4;

export const Blog = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(MOCK_POSTS.length / ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const currentPosts = MOCK_POSTS.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <Helmet>
        <title>Blog - VoiceRecordingEasy</title>
        <meta name="description" content="Explore the latest in voice recognition technology, usage tips, and industry trends." />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 6
          }}
        >
          Blog Articles
        </Typography>

        <Grid container spacing={4}>
          {currentPosts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card 
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography 
                      variant="h5" 
                      component="h2"
                      sx={{ 
                        fontWeight: 600,
                        color: 'primary.main'
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 3 }}
                  >
                    {post.summary}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
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

                  <Typography variant="caption" color="text.secondary">
                    {post.readTime}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button 
                    component={RouterLink} 
                    to={`/blog/${post.id}`}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </>
  );
}; 
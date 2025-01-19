import { Box, Container, Typography, Link, Stack } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
              Voice to Text Converter
            </Link>{' '}
            {new Date().getFullYear()}
            {'. '}
            All rights reserved.
          </Typography>
          
          <Link
            href="https://x.com/ShiMin_alcor"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <TwitterIcon fontSize="small" />
            <Typography variant="body2">
              关注我们的Twitter
            </Typography>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}; 
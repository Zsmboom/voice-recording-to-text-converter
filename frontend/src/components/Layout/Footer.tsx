import { Box, Container, Typography, Link } from '@mui/material';

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
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="/">
            Voice to Text Converter
          </Link>{' '}
          {new Date().getFullYear()}
          {'. '}
          All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}; 
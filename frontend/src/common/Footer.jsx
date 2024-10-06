import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 6,
            px: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We are committed to providing the best products for our customers.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  Quick Links
                </Typography>
                <Link href="#" color="inherit">
                  Home
                </Link>
                <br />
                <Link href="#" color="inherit">
                  Services
                </Link>
                <br />
                <Link href="#" color="inherit">
                  Contact
                </Link>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  Follow Us
                </Typography>
                <IconButton href="#" color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton href="#" color="inherit">
                  <TwitterIcon />
                </IconButton>
                <IconButton href="#" color="inherit">
                  <InstagramIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Copyright />
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

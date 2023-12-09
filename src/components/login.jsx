import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const user = {
      username_email: formData.get('username_email'),
      password: formData.get('password'),
    };

    if (!user.username_email || !user.password) {
      alert('Please fill in all fields');
      return;
    }

    axios
      .post('http://localhost:8081/login', user, {
        withCredentials: true,
      })
      .then((res) => navigate('/'))
      .catch((err) => alert(err.response.data));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
            padding: theme.spacing(4),
            borderRadius: theme.spacing(2),
            backgroundColor: '#fff',
          }}
        >
          <Avatar sx={{ m: theme.spacing(1), bgcolor: theme.palette.secondary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: theme.spacing(2) }}>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: '100%', '& > :not(style)': { marginBottom: theme.spacing(2) } }}
          >
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address or Username"
              name="username_email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: theme.spacing(2), backgroundColor: theme.palette.primary.main }}
            >
              Login
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signup" variant="body2" style={{ textDecoration: 'none' }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

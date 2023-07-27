import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/actions/authActions';

const defaultTheme = createTheme();

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errors = useSelector((state) => state.errors);

  const [size, setSize] = React.useState('');

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    console.log(errors, "err")
  }, [dispatch, errors])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      company: data.get('company'),
      company_size: data.get('company_size'),
      password: data.get('password'),
    };
    dispatch(registerUser(newUser, navigate));
  };

  React.useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [navigate, isAuthenticated]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={Boolean(errors.firstName)}
                  helperText={ errors.firstName ? errors.firstName : ""}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  error={Boolean(errors.lastName)}
                  helperText={ errors.lastName ? errors.lastName : ""}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  required 
                  fullWidth 
                  id="email" 
                  label="Email Address" 
                  name="email" 
                  error={Boolean(errors.email)}
                  helperText={ errors.email ? errors.email : ""}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  required 
                  fullWidth 
                  id="company" 
                  label="Company Name" 
                  name="company" 
                  error={Boolean(errors.company)}
                  helperText={ errors.company ? errors.company : ""}
                  autoComplete="company"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl 
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-label">Company Size</InputLabel>
                  <Select
                    id="company_size"
                    name="company_size"
                    value={size}
                    label="Company Size" 
                    error={Boolean(errors.company_size)}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Self-employed"}>Self-employed</MenuItem>
                    <MenuItem value={"1-10 employees"}>1-10 employees</MenuItem>
                    <MenuItem value={"11-50 employees"}>11-50 employees</MenuItem>
                    <MenuItem value={"51-200 employees"}>51-200 employees</MenuItem>
                    <MenuItem value={"201-500 employees"}>201-500 employees</MenuItem>
                    <MenuItem value={"501-1000 employees"}>501-1000 employees</MenuItem>
                    <MenuItem value={"1001-5000 employees"}>1001-5000 employees</MenuItem>
                    <MenuItem value={"5001-10000 employees"}>5001-10000 employees</MenuItem>
                    <MenuItem value={"10001+ employees"}>10001+ employees</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={Boolean(errors.password)}
                  helperText={ errors.password ? errors.password : ""}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterForm;

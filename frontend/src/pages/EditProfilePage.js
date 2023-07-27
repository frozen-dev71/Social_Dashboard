import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
// import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/actions/authActions';

const defaultTheme = createTheme();

function EditProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errors = useSelector((state) => state.errors);
  const users = useSelector((state) => state.auth.user);
  const updateeUser = useSelector((state) => state.update.user);
  const password = useSelector((state) => state.checked.password);

  useEffect(() => {
    console.log(errors, "err")
  }, [dispatch, errors])

  useEffect(() => {
    console.log(updateeUser, "updateeUser")
  }, [dispatch, updateeUser])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try{
      const newUser = {
        id: users.id,
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        company: data.get('company'),
        company_size: data.get('company_size'),
        password: data.get('password'),
      };
      dispatch(updateUser(newUser));
      alert("Successfuly updated!");
      navigate('/');
    }
    catch(error){
      console.error('Failed to update', error);
      alert("Failed to update");
    }      
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            Changing Profile
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
                  defaultValue={users.firstName}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName ? errors.firstName : ""}
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
                  defaultValue={users.lastName}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName ? errors.lastName : ""}
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
                  defaultValue={users.userEmail}
                  error={Boolean(errors.email)}
                  helperText={errors.email ? errors.email : ""}
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
                  defaultValue={users.company}
                  error={Boolean(errors.company)}
                  helperText={errors.company ? errors.company : ""}
                  autoComplete="company"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                >
                  <InputLabel>Company Size</InputLabel>
                  <Select
                    required
                    id="company_size"
                    name="company_size"
                    defaultValue={users.company_size}
                    label="Company Size"
                    autoComplete="company_size"
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
                  defaultValue={password}
                  error={Boolean(errors.password)}
                  helperText={errors.password ? errors.password : ""}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditProfilePage;

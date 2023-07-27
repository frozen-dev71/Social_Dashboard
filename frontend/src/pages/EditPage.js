import React, { useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkPassword } from '../redux/actions/authActions';

const defaultTheme = createTheme();

function EditPage() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector((state) => state.auth.user);
    const checked = useSelector((state) => state.checked.checked);
    const errors = useSelector((state) => state.errors);

    useEffect(() => {
        console.log(users)
    }, [dispatch, users])

    useEffect(() => {
        console.log(errors, "aa")
      }, [dispatch, errors])

    useEffect(() => {
        if (checked) {
            navigate('/editprofile');
        }
    }, [dispatch, checked])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        // Dispatch the loginUser action
        try {
          const resultAction = await dispatch(
            checkPassword({
              password: data.get('password'),
              prepwd: users.pwd,
            })
          );
          
        } catch (error) {
          console.error('Failed to log in:', error);
        }
      };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            Setting profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid item xs={12}>
            <TextField
                sx={{
                  width: 500
                }}
                name="password"
                label="Check your password"
                type="password"
                id="password"
                error={Boolean(errors.result)}
                helperText={ errors.result ? errors.result : ""}
                autoComplete="new-password"
            />
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Enter
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditPage;

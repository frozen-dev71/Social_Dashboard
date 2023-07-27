import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from '@mui/material';

const defaultTheme = createTheme();

function ProfilePage() {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(users)
  }, [dispatch, users])

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
          <Avatar sx={{ mt: 1, bgcolor: 'secondary.main', width: "50px", height: "50px"}} />
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h3" gutterBottom>
                {users.firstName}
              </Typography>
              <Typography variant="h3" gutterBottom>
                {users.lastName}
              </Typography>
            </Stack>
          </Box>
          <Rating sx={{ mt: 0 }} size="large" name="read-only" value={5} readOnly />
          <Typography variant="h5" sx={{ mt: 2, color: 'text.secondary' }} noWrap>
            {users.userEmail}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }} noWrap>
          {users.company} ({users.company_size_min} ~ {users.company_size_max})
        </Typography>
          
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ProfilePage;

'use client';

// material-ui
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock'; // Optional but nice
// project import
import AuthPasswordChange from 'components/cards/AuthPasswordChange';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Alert} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';
import React from 'react';

// ================================|| CHANGE PASSWORD ||================================ //

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: ''
};

export default function ChangePassword() {
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === ThemeMode.DARK;

  const onSuccess = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'Password changed successfully!',
      alertSeverity: 'success'
    });
  }

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'Password change failed! Error: ' + message,
      alertSeverity: 'error'
    });
  };

  return (
    <>
      {alert.showAlert && (
        <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
        </Alert>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LockIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h3" mt={1}>
            Change Password
          </Typography>
          <Typography color="text.secondary">Update your account password</Typography>
        </Box>

        <Box sx={{ mt: 1}}>
          <AuthPasswordChange onSuccess={onSuccess} onError={onError} />
        </Box>
      </Container>
    </>
  );
}

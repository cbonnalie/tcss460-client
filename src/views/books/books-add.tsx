'use client';

import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookIcon from '@mui/icons-material/AutoStoriesOutlined';
import SendBook from '../../sections/books/book-forms/bookSend';
import Avatar from '@mui/material/Avatar';

import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';

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

export default function BooksAdd() {
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const theme = useTheme();

  const onSuccess = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'Book added!',
      alertSeverity: 'success'
    });
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'Book NOT added! Error:' + message,
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.palette.mode === ThemeMode.DARK ? '#grey.A800' : '#ffffff'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <BookIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Book
          </Typography>

          <Box sx={{ mt: 1 }}>
            <SendBook onSuccess={onSuccess} onError={onError} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

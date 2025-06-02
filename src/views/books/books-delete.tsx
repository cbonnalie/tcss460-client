// Tells Next.js to treat this file as a Client Component
'use client';

// Imports
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TrashIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Alert } from '@mui/material';
import DeleteBook from '../../sections/books/book-forms/bookDelete';
import Typography from '@mui/material/Typography';

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

export default function BooksDelete() {
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === ThemeMode.DARK;
  const onSuccess = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'Book deleted!',
      alertSeverity: 'success'
    });
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'Book NOT deleted! Error: ' + message,
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
            alignItems: 'center'
          }}
        >
          <Avatar sx={{
            m: 1,
            bgcolor: isDarkMode ? 'secondary.main' : 'primary.main'
          }}>
            <TrashIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Delete Book
          </Typography>
          <Box sx={{ mt: 1 }}>
            <DeleteBook onSuccess={onSuccess} onError={onError} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

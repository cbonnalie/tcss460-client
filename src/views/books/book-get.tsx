'use client';

import * as React from 'react';

import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookIcon from '@mui/icons-material/AutoStoriesOutlined';
import BookSearch from '../../sections/books/book-forms/bookSearch';
import Avatar from '@mui/material/Avatar';
import FilteredBookList from './filtered-book-list';
import { IBook } from 'types/book';

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

export default function BookGet() {
  const [alert, setAlert] = React.useState(EMPTY_ALERT);

  const [filteredBooks, setFilteredBooks] = React.useState<IBook[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  const onSuccess = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'Book Retrieved!',
      alertSeverity: 'success'
    });
    setLoadError(null);
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'Book NOT Found! Error: ' + message,
      alertSeverity: 'error'
    });
    setLoadError(message);
  };

  return (
    <>
      {alert.showAlert && (
        <Alert severity={alert.alertSeverity as any} onClose={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
        </Alert>
      )}
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <BookIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Book Search
          </Typography>

          <Box sx={{ mt: 1 }}>
            <BookSearch onSuccess={onSuccess} onError={onError} setBooks={setFilteredBooks} setIsLoading={setIsLoading} />
          </Box>

          <Box sx={{ mt: 1, width: '100%' }}>
            <FilteredBookList books={filteredBooks} loading={isLoading} error={loadError} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

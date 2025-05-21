'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  Divider,
  List,
  Pagination,
  Stack,
  CircularProgress
} from '@mui/material';
import Box from '@mui/material/Box';

import axios from 'utils/axios';
import { IBook } from 'types/book';
import { BookListItem } from '../../components/BookListItem';
import { useCallback, useEffect } from 'react';

export default function BookList() {
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const fetchBooks = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get('/books/all', {
        params: { page, limit: pagination.limit }
      });

      const transformedBooks: IBook[] = response.data.books.map(book => ({
        isbn13: book.isbn13,
        authors: book.authors.split(', '),
        publication: book.publication,
        original_title: book.original_title,
        title: book.title,
        average: book.ratings.average,
        count: book.ratings.count,
        rating_1: book.ratings.rating_1,
        rating_2: book.ratings.rating_2,
        rating_3: book.ratings.rating_3,
        rating_4: book.ratings.rating_4,
        rating_5: book.ratings.rating_5,
        large: book.icons.large,
        small: book.icons.small
      }));

      setBooks(transformedBooks);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.total,
        totalPages: Math.ceil(response.data.total / response.data.limit)
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books. Please try again later.');
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchBooks(pagination.page);
  }, [fetchBooks, pagination.page]);

  const handlePageChange = (_event, page: number) => {
    if (page !== pagination.page) {
      setPagination(prev => ({ ...prev, page }));
    }
  }

  if (loading) {
    return (
      <Container component='main' maxWidth='md'>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container component='main' maxWidth='md'>
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography color='error'>{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ mt: 1, width: '100%' }}>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress />
            </Box>
          ) : books.length > 0 ? (
            <>
              <List>
                {books.map((book, index) => (
                  <React.Fragment key={`book-${book.isbn13}`}>
                    <BookListItem book={book} />
                    {index < books.length - 1 && <Divider variant='middle' component='li' />}
                  </React.Fragment>
                ))}
              </List>

              <Stack spacing={2} sx={{ my: 4, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Showing {pagination.page * pagination.limit - pagination.limit + 1}-
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} books
                  </Typography>
                </Box>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color='primary'
                  showFirstButton
                  showLastButton
                />
              </Stack>
            </>
          ) : (
            // This really should not happen, but just in case
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant='h6' color='text.secondary'>
                No books found.
              </Typography>
            </Box>
          )}


        </Box>
      </Box>
    </Container>
  );
}
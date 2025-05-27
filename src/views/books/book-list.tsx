'use client';

import * as React from 'react';
import { useCallback, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CircularProgress, Divider, List, Pagination, Stack } from '@mui/material';

import axios from 'utils/axios';
import { IBook } from 'types/book';
import { BookListItem } from '../../components/BookListItem';
import { useRouter } from 'next/navigation';

// loading UI
const LoadingState = () => (
  <Container component="main" maxWidth="md">
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <CircularProgress />
    </Box>
  </Container>
);

// error UI
interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <Container component="main" maxWidth="md">
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Typography color="error">{message}</Typography>
    </Box>
  </Container>
);

// empty UI
const EmptyState = () => (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant="h6" color="text.secondary">
      No books found.
    </Typography>
  </Box>
);

// books list
interface BooksListProps {
  books: IBook[];
  onBookClick: (book: IBook) => void;
}

const BooksList: React.FC<BooksListProps> = ({ books, onBookClick }) => (
  <List>
    {books.map((book, index) => (
      <React.Fragment key={`book-${book.isbn13}`}>
        <BookListItem book={book} onClick={() => onBookClick(book)} />
        {index < books.length - 1 && <Divider variant="middle" component="li" />}
      </React.Fragment>
    ))}
  </List>
);

// pagination
interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PaginationControlProps {
  pagination: PaginationInfo;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({ pagination, onPageChange }) => (
  <Stack spacing={2} sx={{ my: 4, alignItems: 'center' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Showing {pagination.page * pagination.limit - pagination.limit + 1}-
        {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} books
      </Typography>
    </Box>
    <Pagination
      count={pagination.totalPages}
      page={pagination.page}
      onChange={onPageChange}
      color="primary"
      showFirstButton
      showLastButton
    />
  </Stack>
);

// transform helper function
const transformBookData = (bookData: any) => ({
  isbn13: bookData.isbn13,
  authors: bookData.authors.split(', '),
  publication: bookData.publication,
  original_title: bookData.original_title,
  title: bookData.title,
  average: bookData.ratings.average,
  count: bookData.ratings.count,
  rating_1: bookData.ratings.rating_1,
  rating_2: bookData.ratings.rating_2,
  rating_3: bookData.ratings.rating_3,
  rating_4: bookData.ratings.rating_4,
  rating_5: bookData.ratings.rating_5,
  large: bookData.icons.large,
  small: bookData.icons.small
});

// main component
export default function BookList() {
  const router = useRouter();

  const [books, setBooks] = React.useState<IBook[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const handleBookClick = useCallback((book: IBook) => {
    const isbn13 = book.isbn13;
    router.push(`/books/book/view?isbn13=${isbn13}`);
  }, [router]);

  const fetchBooks = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get('/books/all', {
        params: { page, limit: pagination.limit }
      });

      const transformedBooks: IBook[] = response.data.books.map(transformBookData);

      setBooks(transformedBooks);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.total,
        totalPages: Math.ceil(response.data.total / response.data.limit)
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchBooks(pagination.page).then();
  }, [fetchBooks, pagination.page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== pagination.page) {
      setPagination(prev => ({ ...prev, page }));
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ mt: 1, width: '100%' }}>
          {books.length > 0 ? (
            <>
              <BooksList
                books={books}
                onBookClick={handleBookClick}
              />

              <PaginationControl
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </Box>
      </Box>
    </Container>
  );
}
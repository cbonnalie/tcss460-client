'use client';

import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CircularProgress, Divider, List, Pagination, Stack } from '@mui/material';

import { IBook } from 'types/book';
import { BookListItem } from '../../components/BookListItem';
import { useRouter } from 'next/navigation';
import { ThemeMode } from '../../config';
import { useTheme } from '@mui/material/styles';

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

const BooksList: React.FC<BooksListProps> = ({ books, onBookClick, theme }) => (
  <List>
    {books.map((book, index) => (
      <React.Fragment key={`book-${book.isbn13}`}>
        <BookListItem book={book} onClick={() => onBookClick(book)} />
        {index < books.length - 1 && (
          <Divider
            variant="middle"
            component="li"
            sx={{
              borderColor: theme.palette.mode === ThemeMode.DARK ? '#ffffff' : 'grey.A800'
            }}
          />
        )}
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
        Showing {pagination.page * pagination.limit - pagination.limit + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)}{' '}
        of {pagination.total} books
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

// main component
interface FilteredBookListProps {
  books: IBook[];
  loading: boolean;
  error: string | null;
}

export default function FilteredBookList({ books, loading, error }: FilteredBookListProps) {
  const router = useRouter();
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const limit = 20;

  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * limit;
    return books.slice(start, start + limit);
  }, [books, page]);

  const pagination: PaginationInfo = {
    page,
    limit,
    total: books.length,
    totalPages: Math.ceil(books.length / limit)
  };

  const handleBookClick = useCallback(
    (book: IBook) => {
      router.push(`/books/book/view?isbn13=${book.isbn13}`);
    },
    [router]
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    if (newPage !== page) setPage(newPage);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mt: 1, width: '100%' }}>
          {paginatedBooks.length > 0 ? (
            <>
              <BooksList books={paginatedBooks} onBookClick={handleBookClick} theme={theme} />
              <PaginationControl pagination={pagination} onPageChange={handlePageChange} />
            </>
          ) : (
            <EmptyState />
          )}
        </Box>
      </Box>
    </Container>
  );
}

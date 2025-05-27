'use client';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { IconButton, LinearProgress, Stack, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IBook } from 'types/book';
import axios from 'utils/axios';

const defaultTheme = createTheme();

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
export default function BookViewPage() {
  const searchParams = useSearchParams();
  const isbn = searchParams.get('isbn13');
  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/books/isbn`, {
          params: { isbn: isbn }
        });
        const transformedBook = transformBookData(response.data);
        setBook(transformedBook);
      } catch (error) {
        console.error('Error fetching book:', error);
        setBook(null);
      }
    };

    if (isbn) {
      fetchBook().then();
    }
  }, [isbn]);

  if (!book) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Typography variant="h6" sx={{ mt: 10, textAlign: 'center' }}>
            Book not found
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ImportContactsIcon />
          </Avatar>
          <Box sx={{ mt: 2 }}>
            <img src={book.large} alt={book.title} style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
          <Typography component="h1" variant="h5">
            {book.title}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Author:</strong> {book.authors.join(', ')}
          </Typography>
          <Typography>
            <strong>Original Title:</strong> {book.original_title}
          </Typography>
          <Typography>
            <strong>Publication Year:</strong> {book.publication}
          </Typography>
          <RatingSummary book={book} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function RatingSummary({ book }: { book: IBook }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    rating_1_star: book.rating_1,
    rating_2_star: book.rating_2,
    rating_3_star: book.rating_3,
    rating_4_star: book.rating_4,
    rating_5_star: book.rating_5
  });

  const totalRatings =
    editableData.rating_1_star +
    editableData.rating_2_star +
    editableData.rating_3_star +
    editableData.rating_4_star +
    editableData.rating_5_star;

  const avgRating =
    (editableData.rating_1_star +
      editableData.rating_2_star * 2 +
      editableData.rating_3_star * 3 +
      editableData.rating_4_star * 4 +
      editableData.rating_5_star * 5) /
    totalRatings;

  const ratingData = [
    { stars: 5, key: 'rating_5_star', count: editableData.rating_5_star },
    { stars: 4, key: 'rating_4_star', count: editableData.rating_4_star },
    { stars: 3, key: 'rating_3_star', count: editableData.rating_3_star },
    { stars: 2, key: 'rating_2_star', count: editableData.rating_2_star },
    { stars: 1, key: 'rating_1_star', count: editableData.rating_1_star }
  ];

  const maxCount = Math.max(...ratingData.map((r) => r.count));

  const getStarIcons = (rating: number) => {
    const rounded = Math.round(rating);
    return (
      <>
        {[...Array(5)].map((_, i) =>
          i < rounded ? <StarIcon key={i} color="primary" fontSize="small" /> : <StarBorderIcon key={i} color="disabled" fontSize="small" />
        )}
      </>
    );
  };

  const handleChange = (key: string, value: string) => {
    const intValue = parseInt(value) || 0;
    setEditableData((prev) => ({ ...prev, [key]: intValue }));
  };

  const handleSave = async () => {
    try {
      await axios
        .put(`/books/ratings`, {
          isbn13: book.isbn13,
          rating_1_star: editableData.rating_1_star,
          rating_2_star: editableData.rating_2_star,
          rating_3_star: editableData.rating_3_star,
          rating_4_star: editableData.rating_4_star,
          rating_5_star: editableData.rating_5_star
        })
        .then();
    } catch (error) {
      console.error('Error saving ratings:', error);
      alert('Failed to save ratings. Please try again later.');
    }

    setIsEditing(false);
  };

  return (
    <Box sx={{ mt: 4, width: 'md', position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Ratings & Reviews</Typography>
        <IconButton onClick={() => setIsEditing((prev) => !prev)}>
          <EditIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {getStarIcons(avgRating)}
        <Typography variant="body1">
          {Math.round(avgRating * 10) / 10} average from {totalRatings.toLocaleString()} ratings
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        {ratingData.map(({ stars, key, count }) => {
          const percent = (count / maxCount) * 100;
          return (
            <Stack direction="row" spacing={1} alignItems="center" key={stars}>
              <Typography sx={{ width: 50 }}>{stars} star</Typography>
              {isEditing ? (
                <TextField
                  type="number"
                  value={count}
                  onChange={(e) => handleChange(key, e.target.value)}
                  size="small"
                  sx={{ width: 100 }}
                />
              ) : (
                <>
                  <LinearProgress variant="determinate" value={percent} sx={{ flex: 1, height: 10, borderRadius: 5 }} />
                  <Typography sx={{ width: 50, textAlign: 'right' }}>{count.toLocaleString()}</Typography>
                </>
              )}
            </Stack>
          );
        })}
      </Box>

      {isEditing && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
}

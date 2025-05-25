'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as React from 'react';
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

const defaultTheme = createTheme();

interface Book {
  isbn13: string;
  title: string;
  original_title: string;
  authors: string;
  publication_year: string;
  rating_avg: number;
  rating_count: number;
  rating_1_star: number;
  rating_2_star: number;
  rating_3_star: number;
  rating_4_star: number;
  rating_5_star: number;
  image_url: string;
  image_small_url: string;
}

const defaultBook = {
  isbn13: '9780525951650',
  title: 'Fall of Giants',
  original_title: 'I, Robot (Robot #0.1)',
  authors: 'Isaac Asimov',
  publication_year: '2005',
  rating_avg: (1221 * 1 + 5332 * 2 + 35107 * 3 + 82535 * 4 + 86024 * 5) / (1221 + 5332 + 35107 + 82535 + 86024),
  rating_count: 1221 + 5332 + 35107 + 82535 + 86024,
  rating_1_star: 1221,
  rating_2_star: 5332,
  rating_3_star: 35107,
  rating_4_star: 82535,
  rating_5_star: 86024,
  image_url: 'https://images.gr-assets.com/books/1388321463m/41804.jpg',
  image_small_url: 'https://images.gr-assets.com/books/1388321463s/41804.jpg'
};

export default function BookViewPage() {
  const searchParams = useSearchParams();
  const isbn = searchParams.get('isbn13');

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (isbn === defaultBook.isbn13) {
      setBook(defaultBook);
    } else {
      setBook(null);
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
            <img src={book.image_url} alt={book.title} style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
          <Typography component="h1" variant="h5">
            {book.title}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Author:</strong> {book.authors}
          </Typography>
          <Typography>
            <strong>Original Title:</strong> {book.original_title}
          </Typography>
          <Typography>
            <strong>Publication Year:</strong> {book.publication_year}
          </Typography>
          <RatingSummary book={book} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function RatingSummary({ book }: { book: Book }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    rating_1_star: book.rating_1_star,
    rating_2_star: book.rating_2_star,
    rating_3_star: book.rating_3_star,
    rating_4_star: book.rating_4_star,
    rating_5_star: book.rating_5_star
  });

  const totalRatings =
    editableData.rating_1_star +
    editableData.rating_2_star +
    editableData.rating_3_star +
    editableData.rating_4_star +
    editableData.rating_5_star;

  const avgRating =
    (editableData.rating_1_star * 1 +
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

  const handleSave = () => {
    Object.assign(defaultBook, editableData);
    defaultBook.rating_avg = avgRating;
    defaultBook.rating_count = totalRatings;

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

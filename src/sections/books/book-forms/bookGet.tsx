'use client';
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Grid, Stack, InputLabel, OutlinedInput, FormHelperText, Button } from '@mui/material';
import AnimateButton from '../../../components/@extended/AnimateButton';
import axios from 'utils/axios';
import { IBook } from 'types/book';

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

const fetchAllBooks = async (): Promise<IBook[]> => {
  const limit = 1000;
  let page = 1;
  let allBooks: IBook[] = [];
  let total = 0;
  try {
    do {
      const response = await axios.get('/books/all', {
        params: { page, limit }
      });

      const { books, total: newTotal } = response.data;
      allBooks = allBooks.concat(books);
      total = newTotal;

      page++;
    } while ((page - 1) * limit < total);

    return allBooks.map(transformBookData);
  } catch (error: any) {
    console.error('Failed to fetch all books:', error);
    throw new Error(error?.response?.message || 'Unknown error while fetching book by all');
  }
};

const fetchBookByIsbn = async (isbn: string): Promise<IBook> => {
  try {
    const response = await axios.get('/books/isbn', {
      params: { isbn }
    });

    return transformBookData(response.data);
  } catch (error: any) {
    console.error('Failed to fetch book by ISBN:', error);
    throw new Error(error?.response?.data?.message || 'Unknown error while fetching book by ISBN');
  }
};

const fetchBooksByAuthor = async (authorQuery: string): Promise<IBook[]> => {
  let allBooks: IBook[] = [];
  try {
    const response = await axios.get('/books/author', {
      params: { authors: authorQuery }
    });

    allBooks = response.data.books;

    return allBooks.map(transformBookData);
  } catch (error: any) {
    console.error('Failed to fetch book by author:', error);
    throw new Error(error?.response?.data?.message || 'Unknown error while fetching book by author');
  }
};

const fetchBooksbyMinRating = async (min_rating: number): Promise<IBook[]> => {
  const limit = 50;
  let page = 1;
  let allBooks: IBook[] = [];

  try {
    const firstResponse = await axios.get('/books/ratings/min', {
      params: { min_rating, page, limit }
    });

    allBooks = firstResponse.data.books;
    const total = firstResponse.data.total;
    const totalPages = Math.ceil(total / limit);

    for (page = 2; page <= totalPages; page++) {
      const response = await axios.get('/books/ratings/min', {
        params: { min_rating, page, limit }
      });

      allBooks = allBooks.concat(response.data.books);
    }

    return allBooks.map(transformBookData);
  } catch (error: any) {
    console.error('Failed to fetch book by min rating:', error);
    throw new Error(error?.response?.data?.message || 'Unknown error while fetching book by min rating');
  }
};

const fetchBooksbyPopular = async (min_ratings: number): Promise<IBook[]> => {
  const limit = 50;
  let page = 1;
  let allBooks: IBook[] = [];
  try {
    const firstRes = await axios.get('/books/popular', {
      params: { min_ratings, page, limit }
    });

    allBooks = firstRes.data.books;
    const total = firstRes.data.total;
    const totalPages = Math.ceil(total / limit);

    for (page = 2; page <= totalPages; page++) {
      const res = await axios.get('/books/popular', {
        params: { min_ratings, page, limit }
      });

      allBooks = allBooks.concat(res.data.books);
    }

    return allBooks.map(transformBookData);
  } catch (error: any) {
    console.error('Failed to fetch book by popular:', error);
    throw new Error(error?.response?.data?.message || 'Unknown error while fetching book by popular');
  }
};

const fetchAllBooksByYearRange = async (minYear: number = 1450, maxYear: number = new Date().getFullYear()): Promise<IBook[]> => {
  const limit = 50;
  let page = 1;
  let allBooks: IBook[] = [];

  try {
    const firstRes = await axios.get('/books/year', {
      params: { min: minYear, max: maxYear, page, limit }
    });

    allBooks = firstRes.data.books;
    const total = firstRes.data.total;
    const totalPages = Math.ceil(total / limit);

    for (page = 2; page <= totalPages; page++) {
      const res = await axios.get('/books/year', {
        params: { min: minYear, max: maxYear, page, limit }
      });

      allBooks = allBooks.concat(res.data.books);
    }

    return allBooks.map(transformBookData);
  } catch (error: any) {
    console.error('Failed to fetch book by year Range:', error);
    throw new Error(error?.response?.data?.message || 'Unknown error while fetching book by year range');
  }
};

const fetchBooksbyTitle = async (title: string): Promise<IBook[]> => {
  try {
    const response = await axios.get<{ books: IBook[] }>('/books/title', {
      params: { title }
    });

    return response.data.books.map(transformBookData);
  } catch (error: any) {
    console.error('Failed to fetch book by title:', error);
    throw new Error(error?.response?.data?.message || 'Unknown error while fetching book by title');
  }
};

export default function GetBook({
  onSuccess,
  onError,
  setBooks,
  setIsLoading
}: {
  onSuccess: () => void;
  onError: (msg: string) => void;
  setBooks: (books: IBook[]) => void;

  setIsLoading: (loading: boolean) => void;
}) {
  const handleSearch = async (values: any) => {
    setIsLoading(true);

    try {
      const allResults: IBook[][] = [];

      const allBooks = await fetchAllBooks();
      allResults.push(allBooks);

      if (values.isbn13) {
        const isbnBooks = await fetchBookByIsbn(values.isbn13);
        const result: IBook[] = [];
        result.push(isbnBooks);
        allResults.push(result);
      }

      if (values.authors) {
        const authorBooks = await fetchBooksByAuthor(values.authors);
        allResults.push(authorBooks);
      }

      if (values.min_ratings) {
        const minRatingBooks = await fetchBooksbyMinRating(values.min_ratings);
        allResults.push(minRatingBooks);
      }

      if (values.ratings_count) {
        const popularBooks = await fetchBooksbyPopular(values.ratings_count);
        allResults.push(popularBooks);
      }

      if (values.publication_year_start || values.publication_year_end) {
        const minYear = values.publication_year_start ? Number(values.publication_year_start) : 1450;
        const maxYear = values.publication_year_end ? Number(values.publication_year_end) : new Date().getFullYear();

        const yearBooks = await fetchAllBooksByYearRange(minYear, maxYear);
        allResults.push(yearBooks);
      }

      if (values.title) {
        const titleBooks = await fetchBooksbyTitle(values.title);
        allResults.push(titleBooks);
      }

      const intersectedBooks = allResults.reduce((acc, curr) => {
        return acc.filter((book) => curr.some((b) => b.isbn13 === book.isbn13));
      });

      setBooks(intersectedBooks);
      onSuccess();
    } catch (err: any) {
      onError('Failed to fetch books.');
      onError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          isbn13: '',
          title: '',
          authors: '',
          publication_year: '',
          publication_year_start: '',
          publication_year_end: '',
          min_ratings: '',
          ratings_count: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          isbn13: Yup.string().max(255),
          title: Yup.string().max(255),
          original_title: Yup.string().max(255),
          authors: Yup.string().max(255),
          publication_year: Yup.string().max(255)
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          await handleSearch(values);
          setSubmitting(false);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1} alignItems="flex-end" wrap="nowrap">
              <Grid item xs={8}>
                <Stack>
                  <InputLabel htmlFor="isbn13">ISBN</InputLabel>
                  <OutlinedInput
                    id="isbn13"
                    type="text"
                    value={values.isbn13}
                    name="isbn13"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.isbn13 && errors.isbn13)}
                    inputProps={{ sx: { py: 0.5, px: 1 } }}
                  />
                  {touched.isbn13 && errors.isbn13 && <FormHelperText error>{errors.isbn13}</FormHelperText>}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack>
                  <InputLabel htmlFor="year-range">Year Range</InputLabel>
                  <Stack direction="row" spacing={1}>
                    <OutlinedInput
                      id="publication_year_start"
                      type="text"
                      value={values.publication_year_start}
                      name="publication_year_start"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Start"
                      error={Boolean(touched.publication_year_start && errors.publication_year_start)}
                      inputProps={{ min: 0, sx: { py: 0.5, px: 1 } }}
                    />
                    <OutlinedInput
                      id="publication_year_end"
                      type="text"
                      value={values.publication_year_end}
                      name="publication_year_end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      placeholder="End"
                      error={Boolean(touched.publication_year_end && errors.publication_year_end)}
                      inputProps={{ min: 0, sx: { py: 0.5, px: 1 } }}
                    />
                  </Stack>
                  {touched.publication_year_start && errors.publication_year_start && (
                    <FormHelperText error>{errors.publication_year_start}</FormHelperText>
                  )}
                  {touched.publication_year_end && errors.publication_year_end && (
                    <FormHelperText error>{errors.publication_year_end}</FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <OutlinedInput
                    id="title"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                    inputProps={{ sx: { py: 0.5, px: 1 } }}
                  />
                  {touched.title && errors.title && <FormHelperText error>{errors.title}</FormHelperText>}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack>
                  <InputLabel htmlFor="authors">Authors</InputLabel>
                  <OutlinedInput
                    id="authors"
                    type="text"
                    value={values.authors}
                    name="authors"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.authors && errors.authors)}
                    inputProps={{ sx: { py: 0.5, px: 1 } }}
                  />
                  {touched.authors && errors.authors && <FormHelperText error>{errors.authors}</FormHelperText>}
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <InputLabel htmlFor="min_ratings">Min Rating</InputLabel>
                  <OutlinedInput
                    id="min_ratings"
                    type="text"
                    value={values.min_ratings}
                    name="min_ratings"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.min_ratings && errors.min_ratings)}
                    inputProps={{ sx: { py: 0.5, px: 1 } }}
                  />
                  {touched.min_ratings && errors.min_ratings && <FormHelperText error>{errors.min_ratings}</FormHelperText>}
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack>
                  <InputLabel htmlFor="ratings_count">Ratings</InputLabel>
                  <OutlinedInput
                    id="ratings_count"
                    type="text"
                    value={values.ratings_count}
                    name="ratings_count"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.ratings_count && errors.ratings_count)}
                    inputProps={{ sx: { py: 0.5, px: 1 } }}
                  />
                  {touched.ratings_count && errors.ratings_count && <FormHelperText error>{errors.ratings_count}</FormHelperText>}
                </Stack>
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}

              <Grid item xs={5}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    size="medium"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ color: 'primary.contrastText' }}
                  >
                    Get Books
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

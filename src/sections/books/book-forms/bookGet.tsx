'use client';
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
//import axios from 'utils/axios';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import AnimateButton from '../../../components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const defaultBook = {
  isbn13: '9780525951650',
  title: 'Fall of Giants',
  original_title: 'I, Robot (Robot #0.1)',
  authors: 'Isaac Asimov',
  publication_year: '2005',
  rating_avg: 1221 + 5332 + 35107 + 82535 + 86024,
  rating_count: (1221 * 1 + 5332 * 2 + 35107 * 3 + 82535 * 4 + 86024 * 5) / (1221 + 5332 + 35107 + 82535 + 86024),
  rating_1_star: 1221,
  rating_2_star: 5332,
  rating_3_star: 35107,
  rating_4_star: 82535,
  rating_5_star: 86024,
  image_url: 'https://images.gr-assets.com/books/1388321463m/41804.jpg',
  image_small_url: 'https://images.gr-assets.com/books/1388321463s/41804.jpg'
};

function matchParams(params: { isbn13: any; title: any; original_title: any; authors: any; publication_year: any }) {
  return (
    (params.isbn13 === defaultBook.isbn13 || params.isbn13 === '') &&
    (params.title === defaultBook.title || params.title === '') &&
    (params.original_title === defaultBook.original_title || params.original_title === '') &&
    (params.authors === defaultBook.authors || params.authors === '') &&
    (params.publication_year === defaultBook.publication_year || params.publication_year === '') &&
    (params.isbn13 != '' || params.title != '' || params.original_title != '' || params.authors != '' || params.publication_year != '')
  );
}

export default function GetBook({ onSuccess, onError }: { onSuccess: () => void; onError: (msg: string) => void }) {
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{
          isbn13: '9780525951650',
          title: 'Fall of Giants',
          original_title: 'I, Robot (Robot #0.1)',
          authors: 'Isaac Asimov',
          publication_year: '2005',
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
          const params = {
            isbn13: values.isbn13,
            title: values.title,
            original_title: values.original_title,
            authors: values.authors,
            publication_year: values.publication_year
          };

          setSubmitting(true);

          try {
            if (matchParams(params)) {
              router.push(`/books/book/view?isbn13=${defaultBook.isbn13}`);
              onSuccess();
            } else {
              throw new Error('Book not found');
            }
          } catch (err: any) {
            setErrors({ submit: err.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor={'isbn13'}>ISBN</InputLabel>
                  <OutlinedInput
                    id="isbn13"
                    type="text"
                    value={values.isbn13}
                    name="isbn13"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.isbn13 && errors.isbn13)}
                  />
                </Stack>
                {touched.isbn13 && errors.isbn13 && (
                  <FormHelperText error id="helper-text-isbn13">
                    {errors.isbn13}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="publication_year">Publication Year</InputLabel>
                  <OutlinedInput
                    id="publication_year"
                    type="text"
                    value={values.publication_year}
                    name="publication_year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.publication_year && errors.publication_year)}
                  />
                </Stack>
                {touched.publication_year && errors.publication_year && (
                  <FormHelperText error id="helper-text-publication-year">
                    {errors.publication_year}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
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
                  />
                </Stack>
                {touched.title && errors.title && (
                  <FormHelperText error id="helper-text-title">
                    {errors.title}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="original_title">Original Title</InputLabel>
                  <OutlinedInput
                    id="original_title"
                    type="text"
                    value={values.original_title}
                    name="original_title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.original_title && errors.original_title)}
                  />
                </Stack>
                {touched.original_title && errors.original_title && (
                  <FormHelperText error id="helper-text-original-title">
                    {errors.original_title}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
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
                  />
                </Stack>
                {touched.authors && errors.authors && (
                  <FormHelperText error id="helper-text-authors">
                    {errors.authors}
                  </FormHelperText>
                )}
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}

              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    GET BOOK
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

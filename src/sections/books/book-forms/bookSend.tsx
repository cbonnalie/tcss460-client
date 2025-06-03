'use client';
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'utils/axios';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import AnimateButton from '../../../components/@extended/AnimateButton';
import Button from '@mui/material/Button';

export default function SendBook({ onSuccess, onError }: { onSuccess: () => void; onError: (msg: string) => void }) {
  return (
    <>
      <Formik
        initialValues={{
          isbn13: '',
          title: '',
          original_title: '',
          authors: '',
          publication_year: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          isbn13: Yup.string().max(255).required('ISBN is required'),
          title: Yup.string().max(255).required('Title is required'),
          original_title: Yup.string().max(255).required('Original Title is required'),
          authors: Yup.string().max(255).required('Authors are required'),
          publication_year: Yup.string().max(255).required('Publication Year is required')
        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          axios
            .post('/books/book', {
              isbn13: values.isbn13,
              title: values.title,
              original_title: values.original_title,
              authors: values.authors,
              publication_year: values.publication_year,
              rating_avg: 0,
              rating_count: 0,
              rating_1_star: 0,
              rating_2_star: 0,
              rating_3_star: 0,
              rating_4_star: 0,
              rating_5_star: 0,
              image_url: '',
              image_small_url: ''
            })
            .then((response) => {
              setSubmitting(false);
              resetForm({
                values: {
                  isbn13: '',
                  title: '',
                  original_title: '',
                  authors: '',
                  publication_year: '',
                  submit: null
                }
              });
              onSuccess();
            })
            .catch((error) => {
              console.error(error);
              setErrors({ isbn13: error.message });
              setSubmitting(false);
              onError(error.message);
            });
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
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{color: 'primary.contrastText'}}
                  >
                    Add Book
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

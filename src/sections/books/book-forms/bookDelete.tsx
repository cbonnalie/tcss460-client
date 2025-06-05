'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import AnimateButton from 'components/@extended/AnimateButton';
import { Formik } from 'formik';
//import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import axios from 'utils/axios';
import { FormHelperText } from '@mui/material';

export default function DeleteBook({ onSuccess, onError }: { onSuccess: () => void; onError: (msg: string) => void }) {
  //const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{
          isbn13: '',
          startYear: '',
          endYear: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          isbn13: Yup.string().max(255),
          startYear: Yup.string().max(255),
          endYear: Yup.string()
            .max(255)
            .test('endYear-gte-startYear', 'End year must be greater than or equal to start year', function (value) {
              const { startYear } = this.parent;
              if (!startYear || !value) return true; // skip if either is empty
              return Number(value) >= Number(startYear);
            })
        })}
        onSubmit={async (values, { setErrors, setSubmitting, resetForm, setFieldValue }) => {
          try {
            setSubmitting(true);

            // Determine which action to take based on the submit field
            const action = values.submit;

            if (action === 'isbn' || (!action && values.isbn13.trim())) {
              // Delete by ISBN-13 only
              if (!values.isbn13.trim()) {
                setErrors({ isbn13: 'ISBN-13 is required' });
                return;
              }

              const encodedIsbn = encodeURIComponent(values.isbn13.trim());
              await axios.delete(`/books/${encodedIsbn}`);
            } else if (action === 'yearRange') {
              // Delete by year range only
              if (!values.startYear.trim() || !values.endYear.trim()) {
                setErrors({
                  startYear: !values.startYear.trim() ? 'Start year is required' : '',
                  endYear: !values.endYear.trim() ? 'End year is required' : ''
                });
                return;
              }

              if (Number(values.endYear) < Number(values.startYear)) {
                setErrors({ endYear: 'End year must be greater than or equal to start year' });
                return;
              }

              await axios.delete(`/books/?startYear=${values.startYear}&endYear=${values.endYear}`);
            } else {
              setErrors({ submit: 'Please enter an ISBN or select a delete option' });
              return;
            }

            // Reset form on success
            resetForm({
              values: {
                isbn13: '',
                startYear: '',
                endYear: '',
                submit: null
              }
            });
            onSuccess();
          } catch (error: any) {
            console.error(error);
            const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred while deleting';
            setErrors({ submit: errorMessage });
            onError(errorMessage);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="isbn13">ISBN-13</InputLabel>
                  <OutlinedInput
                    id="isbn13"
                    type="text"
                    value={values.isbn13}
                    name="isbn13"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        setFieldValue('submit', 'isbn');
                        handleSubmit();
                      }
                    }}
                    fullWidth
                    placeholder="Enter ISBN-13"
                    error={Boolean(touched.isbn13 && errors.isbn13)}
                  />
                </Stack>
                {touched.isbn13 && errors.isbn13 && (
                  <FormHelperText error id="helper-text-isbn13">
                    {errors.isbn13}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setFieldValue('submit', 'isbn');
                      handleSubmit();
                    }}
                  >
                    DELETE BY ISBN
                  </Button>
                </AnimateButton>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="startYear">Starting Year</InputLabel>
                  <OutlinedInput
                    id="startYear"
                    type="text"
                    value={values.startYear}
                    name="startYear"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter starting year"
                    error={Boolean(touched.startYear && errors.startYear)}
                  />
                </Stack>
                {touched.startYear && errors.startYear && (
                  <FormHelperText error id="helper-text-startYear">
                    {errors.startYear}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="endYear">Ending Year</InputLabel>
                  <OutlinedInput
                    id="endYear"
                    type="text"
                    value={values.endYear}
                    name="endYear"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Enter ending year"
                    error={Boolean(touched.endYear && errors.endYear)}
                  />
                </Stack>
                {touched.endYear && errors.endYear && (
                  <FormHelperText error id="helper-text-endYear">
                    {errors.endYear}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setFieldValue('submit', 'yearRange');
                      handleSubmit();
                    }}
                  >
                    DELETE BY YEAR RANGE
                  </Button>
                </AnimateButton>
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

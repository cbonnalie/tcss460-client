'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import AnimateButton from 'components/@extended/AnimateButton';

export default function DeleteBook({ onSuccess, onError }: { onSuccess: () => void; onError: (msg: string) => void }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <InputLabel htmlFor="isbn13">ISBN-13</InputLabel>
          <OutlinedInput id="" type="text" placeholder="Placeholder" fullWidth disabled value="Delete book by ISBN-13" />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            disabled={false}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            sx={{ color: 'primary.contrastText' }}
          >
            Delete Book
          </Button>
        </AnimateButton>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />

      <Grid item xs={6}>
        <Stack spacing={1}>
          <InputLabel htmlFor="startYear">Starting Year</InputLabel>
          <OutlinedInput id="" type="text" placeholder="Placeholder" fullWidth disabled value="Starting Year" />
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <Stack spacing={1}>
          <InputLabel htmlFor="endYear">Ending Year</InputLabel>
          <OutlinedInput id="" type="text" placeholder="Placeholder" fullWidth disabled value="Ending Year" />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            disabled={false}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            sx={{ color: 'primary.contrastText' }}
          >
            Delete Books
          </Button>
        </AnimateButton>
      </Grid>
    </Grid>
  );
}

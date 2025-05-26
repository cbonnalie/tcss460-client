// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthPasswordChange from 'components/cards/AuthPasswordChange';

// ================================|| CHANGE PASSWORD ||================================ //

export default function ChangePassword() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }} spacing={1}>
            <Typography variant="h3">Change Password</Typography>
            <Typography color="secondary">Update your account password</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthPasswordChange />
        </Grid>
        <Grid item xs={12}>
          {/*<AuthFooter />*/}
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
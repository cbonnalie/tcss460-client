// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock'; // Optional but nice

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthPasswordChange from 'components/cards/AuthPasswordChange';

// ================================|| CHANGE PASSWORD ||================================ //

export default function ChangePassword() {
  return (
    <AuthWrapper showLogo={false}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} textAlign="center" mt={2}>
          <LockIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h3" mt={1}>
            Change Password
          </Typography>
          <Typography color="text.secondary">
            Update your account password
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <AuthPasswordChange />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

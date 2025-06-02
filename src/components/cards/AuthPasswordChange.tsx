'use client';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosServices from '../../utils/axios'; 

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required')
});

export default function AuthPasswordChange() {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      try {
        const response = await axiosServices.patch('/change', {
          oldpassword: values.currentPassword,
          newpassword: values.newPassword
        });

        if (response.status === 200) {
          setStatus({ success: true, message: 'Password changed successfully!' });
          resetForm();
        }
      } catch (error: any) {
        let message = 'Password change failed. Please try again.';
        
        if (error.response) {
          if (error.response.status === 401) {
            message = 'Current password is incorrect';
          } else if (error.response.data?.message) {
            message = error.response.data.message;
          }
        } else if (error.message) {
          message = error.message;
        }
        
        setStatus({ error: message });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      {/* Status Messages */}
      {formik.status?.success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {formik.status.message}
        </Typography>
      )}
      {formik.status?.error && (
        <Typography color="error.main" sx={{ mb: 2 }}>
          {formik.status.error}
        </Typography>
      )}

      <TextField
        fullWidth
        margin="normal"
        label="Current Password"
        name="currentPassword"
        type="password"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
        helperText={formik.touched.currentPassword && formik.errors.currentPassword}
      />

      <TextField
        fullWidth
        margin="normal"
        label="New Password"
        name="newPassword"
        type="password"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />

      <Button 
        type="submit" 
        fullWidth 
        variant="contained" 
        color="primary"
        sx={{ mt: 3 }}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Updating...' : 'Update Password'}
      </Button>
    </Box>
  );
}
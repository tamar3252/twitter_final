import React, { FC } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, UserSignup } from '../../../../Types/User';
import { Box, Grid, Typography, TextField, FormControl, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup } from './Functions';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';

const Signup: FC<{}> = ({}) => {
  const navigate:NavigateFunction = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<User>();

  const mutationSignup = useMutation<void, unknown, { body: User }>({
    mutationFn: ({ body }) => signup(body),
    onSuccess: async (data: UserSignup) => {
        if (data.token) {
            Cookies.set('token', data.token);
            navigate('/home')
        } else {
            toast.error(data , { position: 'top-right' });
        }
    },
    onError: () => {
        toast.error('Failed to login', { position: 'top-right' });
    },
});

  const signupSubmit = async (data: User) => {
     await mutationSignup.mutate({body:data})
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box minHeight="100vh" maxWidth="70vh" display="flex" alignItems="center" justifyContent="center">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Sign up
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(signupSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      {...register('full_name.first_name', { required: 'First name is required' })}
                      label="First Name"
                      variant="outlined"
                      error={!!errors.full_name?.first_name}
                      helperText={errors.full_name?.first_name ? errors.full_name.first_name.message : ''}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      {...register('full_name.last_name', { required: 'Last name is required' })}
                      label="Last Name"
                      variant="outlined"
                      error={!!errors.full_name?.last_name}
                      helperText={errors.full_name?.last_name ? errors.full_name.last_name.message : ''}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      {...register('email', { required: 'Email is required' })}
                      label="Email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      {...register('password', { required: 'Password is required' })}
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password ? errors.password.message : ''}
                      InputProps={{
                        endAdornment: <LockOutlinedIcon />,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center">
                    Already have an account? <Link to="/">Log In</Link>
                  </Typography>
                </Grid>               
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export { Signup };

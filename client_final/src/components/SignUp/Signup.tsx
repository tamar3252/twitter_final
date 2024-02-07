import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User } from '../../../../Types/User';
import { Box, Grid, Typography, TextField, FormControl, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup } from './Functions';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Signup: FC = () => {
  const [error, serError] = useState<string>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<User>();

  const onSubmit = async (data: User) => {
    const res = await signup(data, navigate);
    serError(res as string);
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error" align="center">
                      {error}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export { Signup };

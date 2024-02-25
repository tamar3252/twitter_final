import React, { FC, useState } from 'react';
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

const Signup: FC<{}> = ({ }) => {
  const navigate: NavigateFunction = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<User>();

  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const mutationSignup = useMutation<void, unknown, { body: User }>({
    mutationFn: ({ body }) => signup(body),
    onSuccess: async (data: UserSignup) => {
      if (data.token) {
        Cookies.set('token', data.token);
        navigate('/home')
      } else {
        toast.error(data, { position: 'top-right' });
      }
    },
    onError: () => {
      toast.error('Failed to signup', { position: 'top-right' });
    },
  });

  const signupSubmit = async (data: User) => {
  //   const formData = new FormData();
  
  // formData.append('full_name.first_name', data.full_name.first_name);
  // formData.append('full_name.last_name', data.full_name.last_name);
  // formData.append('email', data.email);
  // formData.append('password', data.password);
  
  // // Append the image file data to the FormData object
  // if (image) {
  //   formData.append('image', image);
  // }
  data.image=data.image[0].name
    await mutationSignup.mutate({ body: data })
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
                </Grid >
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    {/* <TextField
                      {...register('image')}
                      label="Image"
                      variant="outlined"
                      error={!!errors.image}
                      helperText={errors.image ? errors.image.message : ''}
                      onChange={handleFileChange} 
                    /> */}



                    <input {...register('image')} type="file" name="image" onChange={handleFileChange} />
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

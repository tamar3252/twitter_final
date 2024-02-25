import React, { FC } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormInputs } from './Types';
import { Box, Grid, Typography, TextField, FormControl, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from './Functions';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';

const Login: FC<{}> = ({ }) => {
  const navigate: NavigateFunction = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const mutationLogin = useMutation<void, unknown, { body: FormInputs }>({
    mutationFn: ({ body }) => login(body),
    onSuccess: async (data: { token: string }) => {
      if (data.token) {
        Cookies.set('token', data.token);
        navigate('/home');
      } else {
        toast.error(data, { position: 'top-center' });
      }
    },
    onError: () => {
      toast.error('Failed to login', { position: 'top-center' });
    },
  })
  
  const loginSubmit = async (data: FormInputs):Promise<void> => {
    await mutationLogin.mutate({ body: data })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <ToastContainer />

      <Box minHeight="100vh" maxWidth="70vh" display="flex" alignItems="center" justifyContent="center">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(loginSubmit)}>
              <Grid container spacing={2}>
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
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center">
                    already jave account?
                    <Link to="/signup">SignUp</Link>

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

export { Login };

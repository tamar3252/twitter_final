import React, { FC } from 'react'
import { useForm } from 'react-hook-form';
import { FormInputs } from './Types';
import { Box, FormControl } from '@mui/material';
import { useNavigate,NavigateFunction, Link } from 'react-router-dom';
import { login } from './Functions';

const Login: FC = () => {
  const nav:NavigateFunction =useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

   const onSubmit = (data: FormInputs) :void=> {
    login(data,nav)
  }

  return (
    <div>
    <Box display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh">

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
        <Box sx={{ mb: 1 }} className='text-center'>
          <label style={{ marginRight: '5px' }} htmlFor="email">Email</label>
          <input   {...register('email', { required: 'Email is required' })} />
          {errors.email && <p>{errors.email.message}</p>}
        </Box>

        <Box sx={{ mb: 1 }}>
          <label  style={{ marginRight: '5px' }} htmlFor="password">password</label>
          <input {...register('password', { required: 'password required' })} />
          {errors.password && <p>{errors.password.message}</p>}
        </Box>

        <button>Submit</button>
        <Link to="/signup">signup </Link>

        </FormControl>

      </form>

    </Box>
    </div>
  )
}

export { Login }
import React, { FC } from 'react'
import { useForm } from 'react-hook-form';
import {User} from '../../../../../Types/User'
import { Box, FormControl } from '@mui/material';
import { signup } from './Functions';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

const Signup :FC= () => {
    const nav:NavigateFunction =useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<User>();

     const onSubmit = (data: User) => {
        signup(data,nav)
      }

    return (
        <Box display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh">
            
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
            <Box sx={{ mb: 1 }}>
                <label style={{ marginRight: '5px' }} htmlFor="first_name">first_name</label>
                <input {...register('full_name.first_name', { required: 'first name is required' })} />
                {errors.full_name?.first_name && <p>{errors.full_name.first_name.message}</p>}
            </Box>
        
            <Box sx={{ mb: 1 }}>
                <label style={{ marginRight: '5px' }} htmlFor="last_name">last_name</label>
                <input {...register('full_name.last_name', { required: 'last name is required' })} />
                {errors.full_name?.last_name && <p>{errors.full_name.last_name.message}</p>}
            </Box>

            <Box sx={{ mb: 1 }}>
                <label style={{ marginRight: '5px' }} htmlFor="email">Email</label>
                <input {...register('email', { required: 'Email is required' })} />
                {errors.email && <p>{errors.email.message}</p>}
            </Box>

            <Box sx={{ mb: 1 }}>
                <label style={{ marginRight: '5px' }} htmlFor="password">password</label>
                <input {...register('password', { required: 'password required' })} />
                {errors.password && <p>{errors.password.message}</p>}
            </Box>

            <button>signup</button>
            <Link to="/">log in </Link>

            </FormControl>

        </form>
        </Box>
    )

}

export { Signup }
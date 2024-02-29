import React, { FC, useEffect, useState } from 'react'
import { addFollow, changeToManager, checkIsFollow, getAllFollows, logout, removeFollow } from './Functiona';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { UserCopmProps } from './Types';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { User } from '../../../Types/User';
import { NavigateFunction,useNavigate } from 'react-router-dom';

const UserDetails: FC<UserCopmProps> = ({ user, isConnectedUser }) => {
    const [displayUserBox, setDisplayUserBox] = useState<boolean>(false)
    const [isFollow, setIsFollow] = useState<boolean | null>(null)
    const [followsNum, setFollowsNum] = useState<number | null>(0)
    const [isChanged,setIsChanged]=useState<boolean>(false)
    const [managerText,setManagerText]=useState<string>(user?.role!)
    const navigate:NavigateFunction = useNavigate()

    const mutationCheckIsFollow = useMutation<void, unknown>({
        mutationFn: async() =>await checkIsFollow(user._id!),
        onSuccess: async (data: User) => {
            data ? setIsFollow(true) : setIsFollow(false)
        },
        onError: () => {
            toast.error('Failed', { position: 'top-center' });
        },
    });
    const mutationaddFollow = useMutation<void, unknown>({
        mutationFn:async () => await addFollow(user._id!),
        onSuccess: async () => {
            setIsFollow(true)
        },
        onError: () => {
            toast.error('Failed', { position: 'top-center' });
        },
    });
    const mutationRemoveFollow = useMutation<void, unknown>({
        mutationFn: async() => await removeFollow(user._id!),
        onSuccess: async () => {
            setIsFollow(false)
        },
        onError: () => {
            toast.error('Failed', { position: 'top-center' });
        },
    });
    const mutationChangeToManager = useMutation<void, unknown>({
        mutationFn:async () =>await changeToManager(),
        onSuccess: async () => {
            await setIsChanged(true)
        },
        onError: () => {
            toast.error('Failed', { position: 'top-center' });
        },
    })
    const mutationGetAllFollow = useMutation<void, unknown>({
        mutationFn:async () =>await getAllFollows(user._id!),
        onSuccess: async (data: User[]) => {
            setFollowsNum(data.length)
        },
        onError: () => {
            toast.error('Failed', { position: 'top-center' });
        },
    })

    useEffect(() => {
        user && (
            mutationCheckIsFollow.mutate(),
            mutationGetAllFollow.mutate()
        )
    }, [isChanged])


    return (
        <div>
            <Grid container marginBottom={3} spacing={1} alignItems="center">
                <Grid item>
                    <div
                        style={{ position: 'relative' }}>
                        <Avatar onClick={() => displayUserBox ? setDisplayUserBox(false) : setDisplayUserBox(true)}
                            src={user?.image || ''}
                            sx={{ margin: 2, width: 70, height: 70, borderRadius: '50%' }} />

                        {displayUserBox && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50px',
                                    left: '90px',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'white',
                                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    zIndex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>

                                <div>
                                    <Grid container>
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                            <Avatar src={user?.image} sx={{ width: 60, height: 60, marginRight: '10px' }} />
                                            <Typography sx={{ marginBottom: '5px' }}>
                                                {user?.full_name.first_name} {user?.full_name.last_name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="body1" sx={{ color: 'gray', marginBottom: '10px' }}>
                                        {user?.follows ? user?.follows?.length : 0} following
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'gray', marginBottom: '10px' }}>
                                        {followsNum} followers
                                    </Typography>
                                    {!isConnectedUser ?
                                        <Button onClick={() => isFollow ? mutationRemoveFollow.mutate() : mutationaddFollow.mutate()}>
                                            {isFollow ? 'Unfollow' : 'Follow'}
                                        </Button> :
                                        (
                                            <div>
                                                {managerText == 'manager' ?
                                                    <Typography variant="body1" sx={{ color: 'gray', marginBottom: '10px' }}>
                                                        {managerText}
                                                    </Typography> :
                                                    <Button onClick={() =>{mutationChangeToManager.mutate(),setManagerText('manager')}}>{managerText!=user.role?"become a manager":managerText}</Button>
                                                }
                                            <Button onClick={()=>logout(navigate)}>log out</Button>
                                            </div>
                                        )
                                    }                                   
                                </div>
                            </Box>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export { UserDetails }
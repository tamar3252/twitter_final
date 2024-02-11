import React, { FC, useState } from 'react'
import { Tweet } from '../../../../Types/Tweet'
import { TweetCopmProps } from './Types'
import { Avatar, Box, Button, Dialog, Grid, Modal, SxProps, Typography, makeStyles } from '@mui/material'
import { showComments } from './Functions'
import Like from '../Like';
import Comment from '../Comment';



const TweetCopm: FC<TweetCopmProps> = ({ tweet }) => {

    const [comments, setComments] = useState<Tweet[]>([])
    const [displayUserDetailsBox, setDisplayUserDetailsBox] = useState(false)

    const sx: SxProps = {
        "& .MuiDialog-container": {
          alignItems: "flex-start"
        }
     };

    return (
        <div >
            <Box >
                <Grid border={1} margin={2} padding={2} borderRadius={5} boxShadow={2} style={{ position: 'relative' }}>
                    <Dialog
                        onClose={() => setDisplayUserDetailsBox(false)}
                        aria-labelledby="simple-dialog-title"
                        open={displayUserDetailsBox}
                        scroll="paper"
                        sx={sx}
                        
                    >
                        <Box sx={{ width: 200, backgroundColor: '#ffffff' }}> 
                            <Typography id="modal-modal-title" variant="h6" >
                                Text in a modal
                            </Typography>
                        </Box>
                    </Dialog>
                    {/* <Modal
                        open={displayUserDetailsBox}
                      
                        onClose={() => setDisplayUserDetailsBox(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        BackdropProps={{
                            style: { backgroundColor: 'rgba(255, 255, 255, 0.5)' } 
                        }}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '50%',
                            left: '50%'
                        }} 
                    >
                        <Box sx={{ width: 200, backgroundColor: '#ffffff' }}> 
                            <Typography id="modal-modal-title" variant="h6" >
                                Text in a modal
                            </Typography>
                        </Box>
                    </Modal> */}

                    <Grid onClick={() => setDisplayUserDetailsBox(true)} marginBottom={3} container spacing={1} alignItems="center" >
                        <Grid item>
                            <div
                            // onMouseEnter={() => setDisplayUserDetailsBox(true)} onMouseLeave={() => setDisplayUserDetailsBox(false)}
                            >
                                <Avatar src={tweet.user_id.image}
                                    sx={{
                                        width: 40, height: 40, borderRadius: '50%',
                                    }}
                                ></Avatar>
                            </div>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">{tweet.user_id.full_name.first_name} {tweet.user_id.full_name.last_name}</Typography>
                        </Grid>
                    </Grid>




                    {/* 
                    <div style={{ position: 'relative' }}>
                        <Box sx={{ display: displayUserDetailsBox ? 'block' : 'none', zIndex: 'tooltip' }}>
                            <div>{tweet.user_id?.full_name.first_name} {tweet.user_id?.full_name.last_name}</div>
                        </Box>
                    </div> */}


                    <div onClick={() => {
                        tweet.comments?.forEach(async element => {//add catch
                            const comment = await showComments(element)
                            comments ? setComments((prevComments) => [...prevComments, comment]) : setComments([comment])
                            // await showComments(element).then((comment)=>
                            // comments ? setComments((prevComments) => [...prevComments, comment]) : setComments([comment])
                            // )

                        })
                    }
                    }>
                        <Typography fontSize={20}>{tweet.text}</Typography>
                    </div>


                    <Grid container spacing={1} alignItems="center" marginTop={3} justifyContent="space-around">
                        <Like tweet={tweet}></Like>
                        <Comment tweet={tweet}></Comment>
                    </Grid>

                    {comments?.map(element => (
                        <div key={element._id}>
                            <TweetCopm tweet={element} />
                        </div>
                    ))}
                </Grid>
            </Box>



        </div>
    )
}

export { TweetCopm }
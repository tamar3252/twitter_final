import Tweets from '../Tweets'
import { Box, Button, Dialog } from '@mui/material'
import { FC, useState } from 'react'
import { Textarea } from '@mui/joy'
import { addTweet, formSubmit, useUserDetailsQuery } from './Functions'
import { toast } from 'react-toastify'
import { User } from '../../../../Types/User.js'
import UserDetails from '../UserDetails';

const Home:FC<{}> = ({}) => {    
    const { data  } = useUserDetailsQuery();
    const userDetails:User| undefined=data

    const [displayCommentBox, setDisplayCommentBox] = useState<boolean>(false)
    const [tweetText, setTweetText] = useState<string>("")

    return (
        <div>
            <UserDetails user={userDetails as User} isConnectedUser={true}></UserDetails>
            <Button sx={{ borderRadius: '10px',marginTop:"10px" }} variant="contained" onClick={() => setDisplayCommentBox(true)}>new tweet</Button>
            <Dialog
                onClose={() => setDisplayCommentBox(false)}
                aria-labelledby="simple-dialog-title"
                open={displayCommentBox}
                scroll="paper">

                <Box alignItems="center" border={1} padding='30px' borderRadius={2} sx={{ display: displayCommentBox ? 'block' : 'none' }}>
                    <form
                        onSubmit={(e) => formSubmit(e,tweetText)}>
                        <Textarea onChange={(event) => setTweetText(event.target.value)} placeholder="write your tweet" required sx={{ mb: 1,paddingX:'50px',paddingY:'30px',border: 'none',backgroundColor:'white',boxShadow: 'none' }} />
                        <Button onClick={() => setDisplayCommentBox(false)} type="submit">post</Button>
                    </form>
                </Box>
            </Dialog>
            <Tweets></Tweets>
        </div>
    )
}

export { Home }
import Tweets from '../Tweets.tsx'
import { Box, Button, Dialog } from '@mui/material'
import { useState } from 'react'
import { Textarea } from '@mui/joy'
import { addTweet } from './Functions'
import { toast } from 'react-toastify'

const Home = () => {    

    const [displayCommentBox, setDisplayCommentBox] = useState(false)
    const [tweetText, setTweetText] = useState<string>("")

    return (
        <div>
            {/* <UserDetails></UserDetails> */}
            <Button onClick={() => setDisplayCommentBox(true)}>new tweet</Button>
            <Dialog
                onClose={() => setDisplayCommentBox(false)}
                aria-labelledby="simple-dialog-title"
                open={displayCommentBox}
                scroll="paper">

                <Box alignItems="center" border={1} borderRadius={2} sx={{ display: displayCommentBox ? 'block' : 'none' }}>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();

                            //add tweet
                             addTweet(tweetText).catch((err:Error)=>toast.error(err.message))
                        }}>

                        <Textarea onChange={(event) => setTweetText(event.target.value)} placeholder="whrite comment" required sx={{ mb: 1 }} />
                        <Button onClick={() => setDisplayCommentBox(false)} type="submit">post</Button>
                    </form>

                </Box>
            </Dialog>
            <Tweets></Tweets>
        </div>
    )
}

export { Home }
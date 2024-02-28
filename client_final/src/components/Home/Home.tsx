import Tweets from '../Tweets'
import { Box, Button, Dialog, Grid } from '@mui/material'
import { FC, useState } from 'react'
import { Textarea } from '@mui/joy'
import { addTweet, useUserDetailsQuery } from './Functions'
import { toast } from 'react-toastify'
import { User } from '../../../../Types/User.js'
import UserDetails from '../UserDetails';
import { UseMutationResult, useMutation } from 'react-query'
import { UserDetailsContext } from '../Context'

const Home: FC<{}> = ({ }) => {
    const { data } = useUserDetailsQuery()
    const userDetails: User | undefined = data

    const [displayCommentBox, setDisplayCommentBox] = useState<boolean>(false)
    const [tweetText, setTweetText] = useState<string>("")

    const mutationAddTweet: UseMutationResult<void, unknown, { text: string }, unknown> = useMutation<void, unknown, { text: string }>({
        mutationFn: ({ text }) => addTweet(text),
        onSuccess: async () => {
            await toast.success('Tweet added successfully', { position: 'top-center' });
        },
        onError: () => {
            toast.error('Failed to add tweet', { position: 'top-center' });
        },
    });

    const formSubmit = (e: React.FormEvent<HTMLFormElement>, tweetText: string): void => {
        e.preventDefault();
        mutationAddTweet.mutate({ text: tweetText })
    }

    return (
        <Grid width='90%' justifyContent='end' >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <UserDetails user={userDetails as User} isConnectedUser={true}></UserDetails>
                    <Dialog
                        onClose={() => setDisplayCommentBox(false)}
                        aria-labelledby="simple-dialog-title"
                        open={displayCommentBox}
                        scroll="paper">

                        <Box alignItems="center" border={1} padding='30px' borderRadius={2} sx={{ display: displayCommentBox ? 'block' : 'none' }}>
                            <form
                                onSubmit={(e) => formSubmit(e, tweetText)}>
                                <Textarea onChange={(event) => setTweetText(event.target.value)} placeholder="write your tweet" required sx={{ mb: 1, paddingX: '50px', paddingY: '30px', border: 'none', backgroundColor: 'white', boxShadow: 'none' }} />
                                <Button onClick={() => setDisplayCommentBox(false)} type="submit">post</Button>
                            </form>
                        </Box>
                    </Dialog>
                </div>
                <div>
                    <Button sx={{ margin: 2, borderRadius: '10px' }} variant="contained" onClick={() => setDisplayCommentBox(true)}>post tweet</Button>
                </div>
            </div>
            <UserDetailsContext.Provider value={{ userDetails }}>
                <Tweets></Tweets>
            </UserDetailsContext.Provider>
        </Grid>
    )
}

export { Home }
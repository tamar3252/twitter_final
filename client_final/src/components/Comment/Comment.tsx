import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box, Button, Dialog } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { CommentCopmProps } from './Types'
import Textarea from '@mui/joy/Textarea';
import { toast } from 'react-toastify';
import { Tweet } from '../../../../Types/Tweet';
import { useMutation } from 'react-query';
import { ObjectId } from 'mongoose';
import { addComment } from './Functions';
import { getComment } from '../Tweet/Functions';

const Comment: FC<CommentCopmProps> = ({ tweet ,setIsChanged}) => {
    const [displayCommentBox, setDisplayCommentBox] = useState<boolean>(false)
    const [commentText, setCommentText] = useState<string>("")
    const [commentsNum, setCommentsNum] = useState<number>(tweet.comments?.length || 0)

    const setNumComment = async () => {
        const newTweet = await getComment(tweet._id!)
        setCommentsNum(newTweet.comments?.length!)
    }

    useEffect(() => {
        setNumComment()
    }, [])

    const mutationAddComment = useMutation<void, unknown, { tweetId: ObjectId; text: string }>({
        mutationFn: ({ tweetId, text }) => addComment(tweetId, text),
        onSuccess: async () => {
            setCommentsNum((prev: number) => prev + 1);
            setDisplayCommentBox(false);
            setCommentText('');
            setIsChanged&&setIsChanged((prev)=>!prev)
        },
        onError: () => {
            toast.error('Failed to add comment', { position: 'top-center' });
        },
    })

    const formSubmit = (e: React.FormEvent<HTMLFormElement>, tweet: Tweet, commentText: string) => {
        e.preventDefault();
        mutationAddComment.mutate({ tweetId: tweet._id!, text: commentText });
    }

    return (
        <div>
            <Button onClick={() => setDisplayCommentBox(true)}>
                <ChatBubbleOutlineIcon color="action" />
                {commentsNum}
            </Button>
            
            <Dialog
                onClose={() => setDisplayCommentBox(false)}
                aria-labelledby="simple-dialog-title"
                open={displayCommentBox}
                scroll="paper">
                <Box alignItems="center" padding='30px' border={1} borderRadius={2} sx={{ display: displayCommentBox ? 'block' : 'none' }}>
                    <form
                        onSubmit={(e) => formSubmit(e, tweet, commentText)}>
                        <Textarea onChange={(event) => setCommentText(event.target.value)} placeholder="write comment" required sx={{ mb: 1, paddingX: '50px', paddingY: '30px', border: 'none', backgroundColor: 'white', boxShadow: 'none' }} />
                        <Button type="submit">reply</Button>
                    </form>
                </Box>
            </Dialog>
        </div>
    )
}

export { Comment }

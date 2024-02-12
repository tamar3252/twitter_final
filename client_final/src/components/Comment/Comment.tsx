import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box, Button, Dialog, Input, SxProps, Typography } from '@mui/material'
import { ObjectId } from 'mongoose'
import React, { FC, useState } from 'react'
import { CommentCopmProps } from './Types'
import Textarea from '@mui/joy/Textarea';
import { addComment } from './Functions';
import { toast } from 'react-toastify';


const Comment: FC<CommentCopmProps> = ({ tweet }) => {
    const [displayCommentBox, setDisplayCommentBox] = useState(false)
    const [commentText, setCommentText] = useState<string>()
    const [commentsNum, setCommentsNum] = useState(tweet.comments?.length || 0)

    const handleLikeClick = async (tweetId: ObjectId) => {
        setDisplayCommentBox(true)
    }


    return (
        <div>
            <Button onClick={() => handleLikeClick(tweet._id)}>
                {<ChatBubbleOutlineIcon color="blue" />}
                {commentsNum}
            </Button>


            <Dialog
                onClose={() => setDisplayCommentBox(false)}
                aria-labelledby="simple-dialog-title"
                open={displayCommentBox}
                scroll="paper"

            >
                <Box alignItems="center" border={1} borderRadius={2} sx={{ display: displayCommentBox ? 'block' : 'none' }}>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            addComment(tweet._id, commentText).catch((err:Error)=>toast.error(err.message))
                            setCommentsNum((prev) => prev + 1);
                        }}>

                        <Textarea onChange={(event) => setCommentText(event.target.value)} placeholder="whrite comment" required sx={{ mb: 1 }} />
                        <Button onClick={() => setDisplayCommentBox(false)} type="submit">reply</Button>
                    </form>

                </Box>
            </Dialog>


        </div>
    )
}

export { Comment }
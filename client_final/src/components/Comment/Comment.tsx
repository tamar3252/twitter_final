import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box, Button, Dialog } from '@mui/material'
import React, { FC, useState } from 'react'
import { CommentCopmProps } from './Types'
import Textarea from '@mui/joy/Textarea';
import { addComment } from './Functions';
import { toast } from 'react-toastify';


const Comment: FC<CommentCopmProps> = ({ tweet }) => {
    const [displayCommentBox, setDisplayCommentBox] = useState<boolean>(false)
    const [commentText, setCommentText] = useState<string>("")
    const [commentsNum, setCommentsNum] = useState<number>(tweet.comments?.length || 0)


    return (
        <div>
            <Button onClick={() => setDisplayCommentBox(true)}>
                {<ChatBubbleOutlineIcon color="action"/>}
                {commentsNum}
            </Button>

            <Dialog
                onClose={() => setDisplayCommentBox(false)}
                aria-labelledby="simple-dialog-title"
                open={displayCommentBox}
                scroll="paper">

                <Box alignItems="center" padding='30px' border={1} borderRadius={2} sx={{ display: displayCommentBox ? 'block' : 'none' }}>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            addComment(tweet._id!, commentText).catch((err:Error)=>toast.error(err.message))
                            setCommentsNum((prev) => prev + 1);
                        }}>
                        <Textarea onChange={(event) => setCommentText(event.target.value)} placeholder="write comment" required sx={{ mb: 1,paddingX:'50px',paddingY:'30px',border: 'none',backgroundColor:'white',boxShadow: 'none' }} />
                        <Button onClick={() => setDisplayCommentBox(false)} type="submit">reply</Button>
                    </form>
                </Box>
            </Dialog>
        </div>
    )
}

export { Comment }
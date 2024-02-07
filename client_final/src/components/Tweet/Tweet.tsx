import React, { FC,  useState } from 'react'
import { Tweet } from '../../../../Types/Tweet'
import { TweetCopmProps } from './Types'
import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addLike, removeLike, showComments } from './Functions'
import { ObjectId } from "mongoose";




const TweetCopm: FC<TweetCopmProps> = ({ tweet }) => {

    const [likesNum, setLikesNum] = useState(tweet.likes?.length)

    const [liked, setLiked] = useState(false);

    const [likeId, setLikeId] = useState<ObjectId>()

    const handleLikeClick = async (tweetId: ObjectId) => {

        setLikesNum(liked ? tweet.likes?.length : tweet.likes ? tweet.likes?.length + 1 : 1)


        setLiked((prevLiked) => !prevLiked);
        

        const addFunc=async()=>{
            const like: ObjectId | undefined = await addLike(tweetId);
            console.log(like);       
            const id = like;
            if (id) {
                setLikeId(id);
            }

        }

        const removeFunc=()=>{
            removeLike(likeId)
        }

        !liked ?addFunc():removeFunc()
    }

    const [comments, setComments] = useState<Tweet[]>([])
    return (
        <div>
            <Grid border={1} margin={2} padding={2} borderRadius={5} boxShadow={2} >
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <Avatar src={tweet.user_id.image}
                            sx={{
                                width: 40, // Set the width of the image
                                height: 40, // Set the height of the image
                                borderRadius: '50%', // Set the border radius to make it circular
                            }}
                        ></Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">{tweet.user_id.full_name.first_name} {tweet.user_id.full_name.last_name}</Typography>
                        {/* <Typography variant="body2">{tweet.user_id.bio}</Typography> */}
                    </Grid>
                </Grid>
                {/* <div>whrote by: {tweet.user_id.full_name.first_name} {tweet.user_id.full_name.last_name}</div> */}

                <Typography fontSize={20}>{tweet.text}</Typography>
                <Button onClick={() => handleLikeClick(tweet._id)}>
                    {liked ? <FavoriteIcon color="blue" /> : <FavoriteBorderIcon />}
                    {likesNum}
                </Button>








                <div>comments:{tweet.comments?.length}</div>
                <button onClick={() => {
                    tweet.comments?.forEach(async element => {
                        const comment = await showComments(element)
                        comments ? setComments((prevComments) => [...prevComments, comment]) : setComments([comment])
                    })
                }
                }>show comments</button>

                {comments?.map(element => (
                    <div key={element._id}>
                        <TweetCopm tweet={element} />
                    </div>
                ))}
            </Grid>
        </div>
    )
}

export { TweetCopm }
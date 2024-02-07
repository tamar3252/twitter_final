import React, { FC, useContext, useEffect, useState } from 'react'
import {Tweet} from '../../../../../Types/Tweet'
import { TweetCopmProps } from './Types'
import { Box } from '@mui/material'
import { showComments } from './Functions'


const TweetCopm: FC<TweetCopmProps> = ({ tweet }) => {
    const [comments, setComments] = useState<Tweet[]>([])

    return (
        <div>
            <Box border={2} margin={2} padding={2}>
                <div>the tweet:{tweet.text}</div>
                <div>whrote by: {tweet.user_id.full_name.first_name} {tweet.user_id.full_name.last_name}</div>
                <div>likes:{tweet.likes?.length}</div>
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
            </Box>
        </div>
    )
}

export { TweetCopm }
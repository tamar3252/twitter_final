import React, { ChangeEvent, useState } from 'react'
import { sortByNew, sortByPopular, useAllFollowsTweetsQuery, useAllTweetsQuery } from './Functions'
import { Tweet } from '../../../../Types/Tweet'
import { TweetCopm } from '../Tweet/Tweet'
import { QueryClient, useMutation } from 'react-query'
import UserDetails from '../UserDetails'
import { Grid } from '@mui/material'

const Home = () => {
    const queryClient: QueryClient = new QueryClient();

    const { data: allTweets, isLoading, isError } = useAllTweetsQuery();
    const { data: allFollowsTweets } = useAllFollowsTweetsQuery();

    const [listIndex, setListIndex] = useState<number>(0)

    const mutation = useMutation<Tweet[] | undefined, Error, string>(
        async (type: string) => {
            if (type === 'new') {
                setListIndex(0)
                return sortByNew(allTweets);
            }
            else if (type === 'popular') {
                setListIndex(0)
                return sortByPopular(allTweets);
            }
            else if (type === 'new_from_followers') {
                setListIndex(1)
                return sortByNew(allFollowsTweets);
            }
            else if (type === 'popular_from_followers') {
                setListIndex(1)
                return sortByPopular(allFollowsTweets);
            }
            return undefined;
        },
        {
            onSuccess: (newData) => {
                queryClient.setQueryData('allTweets', newData);
            },
        }
    );

    const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        mutation.mutate(e.target.value)
    };


    return (

        <div>
            <UserDetails></UserDetails>
            <h2>all tweets</h2>
            <div>sory by
                <select onChange={handleChange}>
                    <option value={'new'}>new tweets</option>
                    <option value={'popular'}>popular tweets</option>
                    <option value={'new_from_followers'}>new tweets from users you follow</option>
                    <option value={'popular_from_followers'}>popular tweets from users you follow</option>
                </select>
            </div>

            <Grid container rowSpacing={1} columnSpacing={1}>
                {listIndex == 0 && allTweets && allTweets.map(element => (
                    <Grid item xs={6}>
                        <div key={element._id}>
                            <TweetCopm tweet={element} />
                        </div>
                    </Grid>

                ))}

            </Grid>
            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <p>1hhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
                </Grid>
                <Grid item xs={6}>
                <p>1hhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
                </Grid>
                <Grid item xs={6}>
                <p>1hhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
                </Grid>
                <Grid item xs={6}>
                <p>1hhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
                </Grid>
            </Grid> */}

            {listIndex == 1 && allFollowsTweets && allFollowsTweets.map(element => (
                <div key={element._id}>
                    <TweetCopm tweet={element} />
                </div>
            ))
            }
        </div>
    )
}

export { Home }
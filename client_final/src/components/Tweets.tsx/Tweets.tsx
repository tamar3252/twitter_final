import React, { ChangeEvent, useState } from 'react'
import { sortByNew, sortByPopular, getAllFollowsTweets, getAllTweets } from './Functions'
import { Tweet } from '../../../../Types/Tweet'
import { TweetCopm } from '../Tweet/Tweet'
import { QueryClient, useMutation } from 'react-query'
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'

const Tweets = () => {
  const queryClient: QueryClient = new QueryClient();

  const { data: allTweets, isLoading: isLoadingAllTweets, isError: isErrorAllTweets } = getAllTweets();
  isErrorAllTweets && toast.error('Error fetching tweets. Please try again later')

  const { data: allFollowsTweets, isLoading: isLoadingAllFollowsTweets, isError: isErrorAllFollowsTweets } = getAllFollowsTweets();
  isErrorAllFollowsTweets && toast.error('Error fetching tweets. Please try again later')

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

  const sortTweets = (e: ChangeEvent<HTMLSelectElement>): void => {
    mutation.mutate(e.target.value)
  };

  return (
    <div>
      <ToastContainer />
      <Typography variant="h3" align="center" gutterBottom>
        tweets
      </Typography>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">sort by</InputLabel>
        <Select onChange={sortTweets} label="sort by">
          {/* <MenuItem value=""><em>None</em> */}
          <MenuItem value={'new'}>new tweets</MenuItem >
          <MenuItem value={'popular'}>popular tweets</MenuItem >
          <MenuItem value={'new_from_followers'}>new tweets from users you follow</MenuItem >
          <MenuItem value={'popular_from_followers'}>popular tweets from users you follow</MenuItem >
        </Select>
      </FormControl>

      <Grid container rowSpacing={1} columnSpacing={1}>
        {isLoadingAllTweets ?
          toast.info('Loading tweets...') :
          listIndex == 0 && allTweets && allTweets.map(element => (
            <Grid item xs={6}>
              <div key={element._id}>
                <TweetCopm tweet={element} />
              </div>
            </Grid>
          ))}
      </Grid>

      {isLoadingAllFollowsTweets ?
        toast.info('Loading tweets...') :
        listIndex == 1 && allFollowsTweets && allFollowsTweets.map(element => (
          <div key={element._id}>
            <TweetCopm tweet={element} />
          </div>
        ))}

    </div>
  )
}

export { Tweets }
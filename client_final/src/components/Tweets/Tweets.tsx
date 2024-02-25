import React, { ChangeEvent, FC, useState } from 'react'
import { sortByNew, sortByPopular, getAllFollowsTweets, getAllTweets } from './Functions'
import { Tweet } from '../../../../Types/Tweet'
import { TweetInList } from '../TweetInList/TweetInList'
import { QueryClient, useMutation } from 'react-query'
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import { TextField } from '@mui/material'

const Tweets: FC<{}> = ({ }) => {
  const queryClient: QueryClient = new QueryClient()
  const [isChanged, setIsChanged] = useState<boolean>(false)


  const { data: allTweets, isLoading: isLoadingAllTweets, isError: isErrorAllTweets } = getAllTweets();
  isErrorAllTweets && toast.error('Error fetching tweets. Please try again later')


  const { data: allFollowsTweets, isLoading: isLoadingAllFollowsTweets, isError: isErrorAllFollowsTweets } = getAllFollowsTweets();
  isErrorAllFollowsTweets && toast.error('Error fetching tweets. Please try again later')


  const [listIndex, setListIndex] = useState<number>(0)
  const [filterTweetsValue, setFilterTweetsValue] = useState("")

  const mutation = useMutation<Tweet[], Error, string>(
    async (type: string) => {
      switch (type) {
        case 'new':
          setListIndex(0)
          return allTweets ? sortByNew(allTweets) : []
        case 'popular':
          setListIndex(0)
          return allTweets ? sortByPopular(allTweets) : []
        case 'new_from_followers':
          setListIndex(1)
          return allFollowsTweets ? sortByNew(allFollowsTweets) : []
        case 'popular_from_followers':
          setListIndex(1)
          return allFollowsTweets ? sortByPopular(allFollowsTweets) : []
        default:
          return []
      }
    },
    {
      onSuccess: (newData) => {
        queryClient.setQueryData('allTweets', newData);
      },
    }
  )
  const sortTweets = (e: SelectChangeEvent<HTMLSelectElement>): void => {
    mutation.mutate(String(e.target.value))
  }



  return (
    <div >
       {/* <Grid margin='20px' container> */}
      <ToastContainer />
      <Typography variant="h3" align="center" gutterBottom>

      </Typography>
       <Grid container justifyContent='center' spacing={4}>
       <Grid item>
      <FormControl  variant="standard" sx={{ justifyContent:'center', minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">sort by</InputLabel>
        <Select onChange={sortTweets} label="sort by">
          <MenuItem value={'new'}>new tweets</MenuItem >
          <MenuItem value={'popular'}>popular tweets</MenuItem >
          <MenuItem value={'new_from_followers'}>new tweets from users you follow</MenuItem >
          <MenuItem value={'popular_from_followers'}>popular tweets from users you follow</MenuItem >
        </Select>
      </FormControl>
      </Grid>
      <Grid item>
      <TextField
        label="Search"
        onChange={(e:ChangeEvent<HTMLInputElement>) => setFilterTweetsValue(e.target.value)}
      />
      </Grid>

      </Grid>
      <Grid margin='20px' container justifyContent="center" alignItems="center" >


        {isLoadingAllTweets ?
          toast.info('Loading tweets...') :
          listIndex == 0 && allTweets && allTweets
          .filter((element:Tweet) => element.text?.toLowerCase().includes(filterTweetsValue))
          .map((element:Tweet) => (
     
            
            <Grid item xs={10}>
              <div key={String(element._id)}>
                <TweetInList tweet={element} setIsChanged={setIsChanged}/>
              </div>
            </Grid>
          ))}
      </Grid>
      <Grid margin='20px' container justifyContent="center" alignItems="center" >
        {isLoadingAllFollowsTweets ?
          toast.info('Loading tweets...') :
          listIndex == 1 && allFollowsTweets && allFollowsTweets
          .filter((element:Tweet) => element.text.toLowerCase().includes(filterTweetsValue))
          .map((element:Tweet) => (
            <Grid item xs={10}>
              <div key={String(element._id)}>
                <TweetInList tweet={element} setIsChanged={setIsChanged}/>
              </div>
            </Grid>
          ))}
      </Grid>
      {/* </Grid> */}
    </div>
  )
}

export { Tweets }
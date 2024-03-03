import {Tweet} from '../../../Types/Tweet'

export interface TweetInListProps {
  tweet: Tweet;
  setIsChanged?:React.Dispatch<React.SetStateAction<boolean>>
  }
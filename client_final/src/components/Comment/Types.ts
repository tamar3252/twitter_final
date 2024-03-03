import { Tweet } from '../../../Types/Tweet';

export interface CommentCopmProps {
  tweet: Tweet;
  setIsChanged?:React.Dispatch<React.SetStateAction<boolean>>

  }
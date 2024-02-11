import { UseQueryResult } from "react-query";
import { Tweet } from "../../../../Types/Tweet";

export type allTweetsQuery = UseQueryResult<Tweet[] >


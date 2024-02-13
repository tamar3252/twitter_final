import Cookies from "js-cookie";
import { Tweet } from '../../../../Types/Tweet'
import { useQuery } from "react-query";
import { allTweetsQuery } from "./Types";


export const getAllTweets = (): allTweetsQuery => {
    const useAllTweetsQuery = (): allTweetsQuery => {
        return useQuery<Tweet[]>('allTweets',
            async (): Promise<Tweet[]> => {
                const response: Response = await fetch('http://localhost:3000/tweet/all_tweets', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${Cookies.get('token')}`
                    },
                });
                return await response.json();
            }
        );
    }
    return useAllTweetsQuery()
}

export const getAllFollowsTweets = (): allTweetsQuery => {
    const useAllFollowsTweetsQuery = (): allTweetsQuery => {
        return useQuery<Tweet[], Error>('allFollowsTweets',
            async (): Promise<Tweet[]> => {
                const response = await fetch('http://localhost:3000/tweet/tweets_with_follower', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${Cookies.get('token')}`
                    },
                });
                return await response.json();
            })
    }
    return useAllFollowsTweetsQuery()
}

export const sortByNew = (allTweets: Tweet[] ): Tweet[] => {
    return allTweets.sort((a, b) => String(b._id).localeCompare(String(a._id)));
    // return allTweets.sort((a, b) => b._id.toHexString().localeCompare(a._id.toHexString()));
}

export const sortByPopular = (allTweets: Tweet[] ): Tweet[] => {
    return allTweets.sort((a: Tweet, b: Tweet) => b.likes!.length - a.likes!.length);
    // if (!allTweets)
    //     return null
    // return allTweets!.sort((a: Tweet, b: Tweet) =>
    //     b.likes!.length - a.likes!.length
    // )
    // !allTweets?return null:
    // if (allTweets && allTweets?.length > 0)
    //     return allTweets!.sort((a: Tweet, b: Tweet) =>
    //         b.likes!.length - a.likes!.length
    //     )
}

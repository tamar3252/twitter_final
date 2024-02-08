import Cookies from "js-cookie";
import { Tweet } from '../../../../Types/Tweet'
import { useQuery } from "react-query";
import {allTweetsQuery } from "./Types";


export const getAllTweets = () :allTweetsQuery=> {
    const useAllTweetsQuery = (): allTweetsQuery => {
        return useQuery<Tweet[]>('allTweets',
            async (): Promise<Tweet[]> => {
                const response: Response = await fetch('http://localhost:3000/tweet/all_tweets', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return await response.json();
            }
        );
    }
    return useAllTweetsQuery()
}

export const getAllFollowsTweets =(): allTweetsQuery =>{
    const useAllFollowsTweetsQuery = (): allTweetsQuery => {
        return useQuery<Tweet[] | undefined, Error>('allFollowsTweets', 
        async (): Promise<Tweet[] | undefined> => {
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


export const sortByNew = (allTweets: Tweet[] | null | undefined): Tweet[] | undefined => {
    return allTweets?.sort((a, b) => b._id.localeCompare(a._id));
}

export const sortByPopular = (allTweets: Tweet[] | null | undefined): Tweet[] | undefined => {
    if (allTweets && allTweets?.length > 0)
        return allTweets?.sort((a: Tweet, b: Tweet) =>
            b.likes!.length - a.likes!.length
        )
}



// const mutation = useMutation<Tweet[] | undefined, Error, string>(
//     async (type: string,allTweets: Tweet[],setListIndex: Dispatch<SetStateAction<number>>) => {
//       if (type === 'new') {
//         setListIndex(0)
//         return sortByNew(allTweets);
//       }
//       else if (type === 'popular') {
//         setListIndex(0)
//         return sortByPopular(allTweets);
//       }
//       else if (type === 'new_from_followers') {
//         setListIndex(1)
//         return sortByNew(allFollowsTweets);
//       }
//       else if (type === 'popular_from_followers') {
//         setListIndex(1)
//         return sortByPopular(allFollowsTweets);
//       }
//       return undefined;
//     },
//     {
//       onSuccess: (newData) => {
//         queryClient.setQueryData('allTweets', newData);
//       },
//     }
//   );

//  export const sortTweets = (e: ChangeEvent<HTMLSelectElement>,allTweets:Tweet[],setListIndex: Dispatch<SetStateAction<number>>): void => {
//     mutation.mutate(e.target.value,allTweets,setListIndex)
//   };
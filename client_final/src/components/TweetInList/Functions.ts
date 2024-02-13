import { ObjectId } from "mongoose";
import { Tweet } from "../../../../Types/Tweet";

// export const getComment = async (tweetId: ObjectId):Promise<Tweet> => {//change to query
//         const response:Response = await fetch(`http://localhost:3000/tweet/tweet/${tweetId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return await response.json();
// }

// import { UseQueryResult, useQuery } from "react-query";
// import { Tweet } from "../../../../Types/Tweet";


// export const showComments = async (tweetId: string):  UseQueryResult<Tweet> => {
//     const useShowCommentsQuery = (): UseQueryResult<Tweet[] > => {
//         return useQuery<Tweet[]>('allTweets',
//             async (): Promise<Tweet[]> => {
//                     const response = await fetch(`http://localhost:3000/tweet/tweet/${tweetId}`, {
//                         method: 'GET',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                     });

//                     const data = await response.json();
//                     console.log('data2', data);
//                     return data
//                     // console.log('Data from server:', data);

//             })
//     }

//     return await useShowCommentsQuery()
// }

import { ObjectId } from "mongoose";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';



export const deleteTweet = async (tweetId: ObjectId) => {
    const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/tweet/delete_tweet/${tweetId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
    });    
    return await response;
}


export const deleteTweenFunc=async(tweetId:ObjectId,setIsChanged:React.Dispatch<React.SetStateAction<boolean>>)=>{
    const res=await deleteTweet(tweetId).catch((err: Error) => toast.error(err.message))
    !res.ok&& toast.error(await res.json())
    setIsChanged(true)
}

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

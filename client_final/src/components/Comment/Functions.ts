import Cookies from "js-cookie";
import { ObjectId } from "mongoose";
import { Tweet } from "../../../../Types/Tweet";
import { config } from '../../Config'
import { toast } from "react-toastify";
import { UseQueryResult, useQuery } from "react-query";

 const addComment = async (tweetId: ObjectId, text: string): Promise<Tweet> => {
    const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/tweet/add_comment_to_tweet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
        body: JSON.stringify({ tweetId: tweetId, text: text })
    })
    return await response.json();
}

export const useAddCommentQuery = (tweetId: ObjectId, text: string): UseQueryResult<Tweet> => {
    return useQuery<Tweet, Error>(
        ['Comment', tweetId, text], 
        () => addComment(tweetId, text) 
    );
};

// export const addComment = (tweetId: ObjectId, text: string): UseQueryResult<Tweet> => {
//     return useQuery<Tweet, Error>(
//         ['Comment', tweetId, text],
//         async () => {
//             const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/tweet/add_comment_to_tweet`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `${Cookies.get('token')}`
//                 },
//                 body: JSON.stringify({ tweetId: tweetId, text: text })
//             });
//             return response.json();
//         },
//         // {
//         //     onError: (error: Error) => {
//         //         toast.error(error.message);
//         //     },
//         //    onSuccess:(data)=>{
//         //     toast.success('ddddddd');
//         //    }
//         // },
//     );
// };

export const formSubmit = (e: React.FormEvent<HTMLFormElement>, tweet: Tweet, commentText: string, setCommentsNum: React.Dispatch<React.SetStateAction<number>>) => {
    e.preventDefault();
    addComment(tweet._id!, commentText)
    setCommentsNum((prev: number) => prev + 1);
}
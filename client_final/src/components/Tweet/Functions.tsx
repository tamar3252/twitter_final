import Cookies from "js-cookie";
import { Like } from '../../../../Types/Like'
import { ObjectId } from "mongoose";



export const showComments = async (tweetId: string) => {
    try {
        const response = await fetch(`http://localhost:3000/tweet/tweet/${tweetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log('data2',data);
        return data
        // console.log('Data from server:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}


export const addLike=async(tweetId:ObjectId)=>{
    console.log('in add');
    
    try {
        const response = await fetch(`http://localhost:3000/like/add_like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${Cookies.get('token')}`
            },
            body:JSON.stringify({tweet_id:tweetId})
        })

        const data :ObjectId= await response.json();
        console.log(data);
        
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}
export const removeLike=async(tweetId:ObjectId|undefined)=>{
    console.log('in remove');

    try {
        const response = await fetch(`http://localhost:3000/like/remove_like/${tweetId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${Cookies.get('token')}`
            }

        })

        const data = await response.json();
        console.log(data);
        
        return data
        // console.log('Data from server:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}


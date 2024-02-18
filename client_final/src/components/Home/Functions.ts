import Cookies from "js-cookie";
import { User } from "../../../../Types/User";
import { UseQueryResult, useQuery } from "react-query";

export const addTweet = async (text: string):Promise<void> => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/tweet/add_tweet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
        body: JSON.stringify({ text: text })
    })
}

export const getUserDetails = async (): Promise<User> => {
    const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get_user_details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
    });
    return await response.json();
}

export const useUserDetailsQuery = (): UseQueryResult<User> => {
    return useQuery<User>('UserDetails', getUserDetails);
};


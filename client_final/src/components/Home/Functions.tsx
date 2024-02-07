import Cookies from "js-cookie";
import {Tweet} from '../../../../Types/Tweet'
import { UseQueryResult, useQuery } from "react-query";
import {User} from '../../../../Types/User'
import { allTweetsQuery } from "./Types";

export const getAllTweets = async (): Promise<Tweet[] | undefined> => {
    try {
        const response = await fetch('http://localhost:3000/tweet/all_tweets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data: Tweet[] = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const useAllTweetsQuery = (): allTweetsQuery => {
    return useQuery<Tweet[] | undefined>('allTweets', getAllTweets);
};

export const getAllFollowsTweets = async (): Promise<Tweet[] | undefined> => {
    try {
        const response = await fetch('http://localhost:3000/tweet/tweets_with_follower', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },

        });
        const data = await response.json();
        console.log('data', data);

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const useAllFollowsTweetsQuery = () : allTweetsQuery=> {
    return useQuery<Tweet[] | undefined, Error>('allFollowsTweets', getAllFollowsTweets);
};

export const sortByNew = (allTweets: Tweet[] | null | undefined): Tweet[] | undefined => {
    return allTweets?.sort((a, b) => b._id.localeCompare(a._id));

}

export const sortByPopular = (allTweets: Tweet[] | null | undefined) : Tweet[] | undefined=> {
    if (allTweets && allTweets?.length > 0)
        return allTweets?.sort((a: Tweet, b: Tweet) =>
            b.likes!.length - a.likes!.length
        )
}

export const getUserDetails = async ():Promise<User|undefined> => {

    try {
        const response = await fetch(`http://localhost:3000/user/get_user_details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },

        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const useUserDetailsQuery = (): UseQueryResult<User | undefined> => {
    return useQuery<User | undefined, Error>('UserDetails', getUserDetails);
};

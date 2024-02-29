import { createContext } from 'react';
import { User } from '../../Types/User';
import { ObjectId } from 'mongoose';

interface LikeContextType {
    liked:boolean;
    setLiked: React.Dispatch<React.SetStateAction<boolean>>
    likeId:ObjectId|null;
    setLikeId: React.Dispatch<React.SetStateAction<ObjectId|null>>
    likesNum:number;
    setLikesNum: React.Dispatch<React.SetStateAction<number>>
}

interface UserDetailsContextType {
    userDetails: User | undefined;
}

const UserDetailsContext = createContext<UserDetailsContextType>({
    userDetails: undefined,
});

const likeContext = createContext<LikeContextType|null>(null);
export {likeContext,UserDetailsContext};



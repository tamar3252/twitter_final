// MyContext.ts
import { createContext, Dispatch, SetStateAction } from 'react';
import { ObjectId } from 'mongoose';



interface LikeContextType {
    liked:boolean;
    setLiked: React.Dispatch<React.SetStateAction<boolean>>
    likeId:ObjectId|null;
    setLikeId: React.Dispatch<React.SetStateAction<ObjectId|null>>
    likesNum:number;
    setLikesNum: React.Dispatch<React.SetStateAction<number>>
}

const likeContext = createContext<LikeContextType|null>(null);
export {likeContext};



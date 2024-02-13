import Cookies from "js-cookie";

export const addTweet=async(text:string)=>{
    const response: Response = await fetch(`http://localhost:3000/tweet/add_tweet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
        body: JSON.stringify({ text: text })
    })
    return await response.json();
}
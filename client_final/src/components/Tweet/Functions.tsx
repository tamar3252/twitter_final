export const showComments = async (tweetId: string) => {
    try {
        const response = await fetch(`http://localhost:3000/tweet/tweet/${tweetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log('data2', data);
        return data
        // console.log('Data from server:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}



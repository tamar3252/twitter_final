import { User } from '../../../Types/User'

export const signup = async (body: User): Promise<void> => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      full_name: { first_name: body.full_name.first_name, last_name: body.full_name.last_name },
      email: body.email, password: body.password,image: body.image
    }),
  });
  console.log(response);
  
  return await response.json();

}

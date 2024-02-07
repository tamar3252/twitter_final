import { NavigateFunction } from "react-router-dom";
import {User} from '../../../../Types/User'
import Cookies from "js-cookie";


export const signup = async (body: User, nav: NavigateFunction):Promise<void|string> => {
  try {
    const response = await fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({full_name:{first_name:body.full_name.first_name,last_name:body.full_name.last_name},
         email: body.email, password: body.password }),
    });
    const data = await response.json();
    if (data.token){
      Cookies.set('token', data.token)
      nav('/home')
    }
    else{
      return data
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

import { NavigateFunction } from "react-router-dom";
import { FormInputs } from "./Types";
import Cookies from 'js-cookie';

export const login = async (body: FormInputs, nav: NavigateFunction):Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: body.email, password: body.password }),
    });
    const data = await response.json();
    Cookies.set('token', data.token)
    if (data.token)
      nav('/home')
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

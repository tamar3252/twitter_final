import { NavigateFunction } from "react-router-dom";
import { FormInputs } from "./Types";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const login = async (body: FormInputs, nav: NavigateFunction): Promise<void> => {
  const response = await fetch('http://localhost:3000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: body.email, password: body.password }),
  });
  const data = await response.json();

  response.ok ? (
    Cookies.set('token', data.token),
    nav('/home')
  ) : (toast.error(data))
}




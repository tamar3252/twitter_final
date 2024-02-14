import { NavigateFunction } from "react-router-dom";
import { User } from '../../../../Types/User'
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {config} from '../../Config'


export const signup = async (body: User, nav: NavigateFunction): Promise<void> => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      full_name: { first_name: body.full_name.first_name, last_name: body.full_name.last_name },
      email: body.email, password: body.password
    }),
  });
  const data = await response.json();

  response.ok ? (
    Cookies.set('token', data.token),
    nav('/home')
  ) :
    ((toast.error(data)))
}

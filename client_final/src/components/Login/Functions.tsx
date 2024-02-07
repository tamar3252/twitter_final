import { NavigateFunction } from "react-router-dom";
import { FormInputs } from "./Types";
import Cookies from 'js-cookie';
import { UseQueryResult, useQuery } from "react-query";

export const login = async (body: FormInputs, nav: NavigateFunction): Promise<void | unknown | string> => {
  try {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: body.email, password: body.password }),
    });
    const data = await response.json();
    
    if (data.token) {
      Cookies.set('token', data.token)
      nav('/home')
    }
    else {
      return data
    }

  } catch (error: unknown) {
    return error
  }
};



// export const login = (body: FormInputs, nav: NavigateFunction)
// : UseQueryResult<void | unknown | string> => {
//   const loginQueryFunction = async (): Promise<void | unknown | string> => {
//     try {
//       const response = await fetch('http://localhost:3000/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: body.email, password: body.password }),
//       });
//       const data = await response.json();
//       if (data.token) {
//         Cookies.set('token', data.token)
//         nav('/home')
//       }
//       else {
//         console.log(data);
//         return data
//       }
//     } catch (error: unknown) {
//       console.error('Error fetching data:', error);
//       return error;
//     }
//   };
//   return useQuery<void | unknown | string>('login', loginQueryFunction);
// };





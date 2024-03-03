import { FormInputs } from "./Types";

export const login = async (body: FormInputs): Promise<void> => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: body.email, password: body.password }),
  });
  return await response.json();
}




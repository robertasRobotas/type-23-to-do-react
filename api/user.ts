import axios from "axios";

type UserCredentials = {
  email: string;
  password: string;
};

export const loginUser = async (userData: UserCredentials) => {
  const response = await axios.post("http://localhost:3002/login", userData);

  return response;
};

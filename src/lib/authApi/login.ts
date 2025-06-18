import axios from "axios";
import { secret } from "../utils";

export async function handleLogin(username: string, password: string) {
  const data = {
    admin_name:username,
    password,
  };

  try {
    const response = await axios.post(`${secret}/login/admin`, data, {
      headers: { "content-type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
}

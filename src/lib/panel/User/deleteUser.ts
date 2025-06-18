import { secret } from "@/lib/utils";
import axios from "axios";

export async function deleteUser(id: string) {
  try {
    const response = await axios.get(`${secret}/admin/delete/user/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

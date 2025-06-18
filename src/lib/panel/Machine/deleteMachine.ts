import { secret } from "@/lib/utils";
import axios from "axios";

export async function deleteMachine(id: string) {
    console.log(id)
  try {
    const response = await axios.get(
      `${secret}/admin/delete/machine/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
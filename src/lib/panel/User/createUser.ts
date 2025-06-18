import { getId } from "@/hooks/token/Id";
import { secret } from "@/lib/utils";
import axios from "axios";

export async function createUser({
  user_name,
  email,
  password,
  machine_id,
}: {
  user_name: string;
  email: string;
  password: string;
  machine_id: string;
}) {
  const admin_Id = getId();
  try {
    const resposne = await axios.post(`${secret}/admin/create/user`, {
      user_name,
      email,
      password,
      machine_id,
      admin_Id,
    });
    return resposne.data;
  } catch (err) {
    return err;
  }
}

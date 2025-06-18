import { getId } from "@/hooks/token/Id";
import axios from "axios";
import { secret } from "../../utils";

export async function createMachine({
  machine_id,
  label,
}: {
  machine_id: string;
  label: string;
}) {
  const admin_Id = getId();
  try {
    const response = await axios.post(
      `${secret}/admin/create/machine/${admin_Id}`,
      {
        machine_id,
        label,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

import { Machine } from "@/app/(panel)/dashboard/page"
import { getId } from "@/hooks/token/Id"
import { secret } from "@/lib/utils"
import axios from "axios"

export async function getMachines(): Promise<Machine[]> {
  const admin_id =  getId() 
  if (!admin_id) {
    return []
  }

  try {
    const response = await axios.get(`${secret}/admin/machines/${admin_id}`)
    console.log(response.data)
    return response.data.machines
  } catch (error) {
    console.error("Failed to fetch machines:", error)
    return []
  }
}

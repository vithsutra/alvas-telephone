import { History } from "@/app/(panel)/dashboard/[id]/page"
import { Machine } from "@/app/(panel)/dashboard/page"
import { getId } from "@/hooks/token/Id"
import { secret } from "@/lib/utils"
import axios from "axios"

export async function getRecharge({id}:{id:string}): Promise<History[]> {

  try {
    const response = await axios.get(`${secret}/admin/recharge/history/${id}`)
    console.log(response.data.recharge_history)
    return response.data.recharge_history
  } catch (error) {
    console.error("Failed to fetch history:", error)
    return []
  }
}

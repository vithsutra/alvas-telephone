import { History } from "@/app/(panel)/dashboard/[id]/page"
import { secret } from "@/lib/utils"
import axios from "axios"



export async function getExpense({id}:{id:string}): Promise<History[]> {

  try {
    const response = await axios.get(`${secret}/admin/expense/history/${id}`)
    console.log(response.data.recharge_history)
    return response.data.expense_history
  } catch (error) {
    console.error("Failed to fetch history:", error)
    return []
  }
}

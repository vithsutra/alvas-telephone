import { secret } from "@/lib/utils";
import axios from "axios";

export async function rechargeMachine(id: string, amount: number) {
    try {
        const response = await axios.post(`${secret}/admin/recharge/machine/${id}`, {
            amount
        })
        return response.data;
    } catch (error) {
        return error;
    }
}
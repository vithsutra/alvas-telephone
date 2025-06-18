// "use client"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { IndianRupee } from "lucide-react"
// import { useState } from "react"



// export default function DialogRecharge({machine_id}:{machine_id:string}) {
//     const [amount,setamount] = useState("");
//   return (
//     <Dialog >
//       <DialogTrigger asChild>
//         <Button variant="outline" className=" absolute bottom-4 right-4 bg-company-primary-royalBlue hover:bg-blue-500 text-white hover:text-white rounded-full w-10 h-10"><IndianRupee  width={15}/></Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Recharge Machine</DialogTitle>
//           <DialogDescription>
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Rechage
//             </Label>
//             <Input id="name" type="text" value={amount} placeholder="ex:300" className="col-span-3" />
//           </div>
        
//         </div>
//         <DialogFooter>
//           <Button className="bg-company-primary-royalBlue hover:bg-blue-500 text-white hover:text-white" type="submit">Recharge</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

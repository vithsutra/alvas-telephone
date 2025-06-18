import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
  import { deleteMachine } from "@/lib/panel/Machine/deleteMachine"
  import { useState } from "react"
  
  export function DeleteDialogInDropdown({ id }: { id: string }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
  
    async function handleDeleteMachine(id: string) {
      try {
        setLoading(true)
        await deleteMachine(id)
        window.location.reload()
      } catch (error) {
        console.error("Delete failed:", error)
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <>
        <DropdownMenuItem
          className="text-red-600 hover:text-red-500"
          onSelect={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
        >
          Delete
        </DropdownMenuItem>
  
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                machine and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteMachine(id)}
                className="bg-red-600 hover:bg-red-500"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
  
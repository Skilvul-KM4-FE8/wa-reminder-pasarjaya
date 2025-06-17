import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useEditRuko = (id: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (json: any) => {
      const response = await fetch(`/api/client/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      })

      if (!response.ok) {
        throw new Error("Failed to update ruko")
      }

      return await response.json()
    },
    onSuccess: () => {
      console.log("Ruko updated successfully")
      toast.success("Ruko berhasil di update")
      queryClient.invalidateQueries({ queryKey: ["ruko"] })
    },
    onError: (error: any) => {
      toast.error("Gagal mengupdate ruko, silahkan hubungi administrator")
      console.error("Error updating ruko:", error)
    },
  })

  return mutation
}
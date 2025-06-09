import { useMutation, useQueryClient } from "@tanstack/react-query"

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
      queryClient.invalidateQueries({ queryKey: ["ruko"] })
    },
    onError: (error: any) => {
      console.error("Error updating ruko:", error)
    },
  })

  return mutation
}
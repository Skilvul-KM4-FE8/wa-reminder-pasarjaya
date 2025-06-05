import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export const useCreateRuko = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (json: any) => {
      const response = await axios.post("api/ruko", json)
      return await response.data
    },
    onSuccess: () => {
      console.log("Success")
      toast.success("Ruko berhasil di tambahkan")
      queryClient.invalidateQueries({ queryKey: ["ruko"]})
    },
    onError: (error: any) => {
      console.error("Error ", error)
      toast.error("Gagal menambahkan ruko, silahkan hubungi administrator")
    } 
  })

  return mutation
}
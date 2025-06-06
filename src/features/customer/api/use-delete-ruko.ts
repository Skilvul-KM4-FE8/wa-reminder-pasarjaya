import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

// type ResponsePrism = Prisma.MenuGetPayload<{}>

export const useDeleteRuko = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.delete(`/api/client/${id}`)
                console.log(response)
                return await response.data
            } catch (error) {
                console.error(error)
                throw new Error("Failed to delete menu")
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["ruko"]})
            toast.success("Ruko berhasil dihapus")
        },
        onError: () => {
            toast.error("Unable to delete this ruko, please contact the administrator")
            console.error("Error deleting ruko")
        }
    })

    return mutation
}
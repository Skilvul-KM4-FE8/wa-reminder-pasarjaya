import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useCreateRuko = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: any) => {
      const response = await axios.post("process.env.API_WA_URL", json);
      return await response.data;
    },
    onSuccess: () => {
      console.log("Success sending WhatsApp message");
      toast.success("Berhasil mengirim pesan WhatsApp");
      queryClient.invalidateQueries({ queryKey: ["whatsapp"] });
    },
    onError: (error: any) => {
      console.error("Error ", error);
      toast.error("Gagal menambahkan ruko, silahkan hubungi administrator");
    },
  });

  return mutation;
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ResponseType = {
  name: string
  phone: string
  address: string
  contractDue: string
  shopBlock: string
  shopNumber: string
  shopSize: number
  pasarName: string
}


export const useGetRuko = (id?: string) => {
  const queryClient = useQuery<ResponseType>({
    enabled: !!id,
    queryKey: ["ruko", id],
    queryFn: async () => {
      const response = await axios.get(`/api/client/${id}`);

      if (!response.data) {
        throw new Error("NOT FOUND");
      }

      return response.data;
    },
  });

  return queryClient;
};

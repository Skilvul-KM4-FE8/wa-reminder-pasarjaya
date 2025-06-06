import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// type ResponseType = {
//   id: string;
//   name: string;
//   price: string;
//   category: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

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

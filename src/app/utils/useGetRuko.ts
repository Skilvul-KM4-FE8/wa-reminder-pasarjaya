"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetRuko = () => {
  return useQuery({
    queryKey: ["ruko"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/client");
        return res.data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch data");
      }
    },
  });
};

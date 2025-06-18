import { toast } from "sonner";

export const getReminderData = async () => {
  const response = await fetch(`/api/reminder`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  toast.loading("Loading reminder data...");

  if (!response.ok) {
    throw new Error("Failed to fetch reminder data");
  }

  return await response.json();
};

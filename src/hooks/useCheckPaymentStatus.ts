import { useQuery } from "@tanstack/react-query";

interface CheckPaymentStatusResponseProps {
  status: string;
  err_description?: string;
}

const checkPaymentStatus = async (
  orderId: string
): Promise<CheckPaymentStatusResponseProps> => {
  const response = await fetch("/api/check-payment-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId }),
  });

  if (!response.ok) {
    throw new Error("Не вдалося перевірити статус платежу");
  }

  return response.json();
};

export const useCheckPaymentStatus = (orderId: string | null) => {
  return useQuery<CheckPaymentStatusResponseProps, Error>({
    queryKey: ["checkPaymentStatus", orderId],
    queryFn: () => checkPaymentStatus(orderId!),
    enabled: !!orderId,
    retry: false,
  });
};

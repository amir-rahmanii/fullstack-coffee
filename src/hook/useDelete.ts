import useSWR, { mutate } from "swr";
import { useState } from "react";

type UseDeleteOptions = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export function useDelete<T = any>(url: string, options?: UseDeleteOptions) {
  const { onSuccess, onError } = options || {};
  const [isMutating, setIsMutating] = useState(false);

  const deleteItem = async (id: string | number): Promise<T | undefined> => {
    setIsMutating(true); // وضعیت در حال حذف
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item with ID ${id}`);
      }

      const data: T = await response.json();

      // به‌روزرسانی کش
      mutate(url);

      if (onSuccess) onSuccess();

      return data;
    } catch (error) {
      if (onError) onError(error);
      console.error("Delete error:", error); // ثبت خطا
    } finally {
      setIsMutating(false); // پایان عملیات
    }
  };

  return { deleteItem, isMutating };
}

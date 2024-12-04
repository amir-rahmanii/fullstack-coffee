import useSWR, { mutate } from "swr";

type UseDeleteOptions = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export function useDelete<T = any>(url: string, options?: UseDeleteOptions) {
  const { onSuccess, onError } = options || {};

  const deleteItem = async (id: string | number): Promise<T | undefined> => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item with ID ${id}`);
      }

      const data: T = await response.json();

      // به‌روزرسانی داده‌ها در کش
      mutate(url);

      if (onSuccess) onSuccess();

      return data;
    } catch (error) {
      if (onError) onError(error);
      console.error("Delete error:", error);
    }
  };

  return { deleteItem };
}

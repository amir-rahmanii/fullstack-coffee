'use client';

import { SWRConfig } from "swr";
import React, { ReactNode } from "react";

// تعریف نوع برای Props
interface MySWRProviderProps {
  children: ReactNode; // نوع children برای رندر کردن کامپوننت‌های فرزند
}

export const MySWRProvider: React.FC<MySWRProviderProps> = ({ children }) => (
  <SWRConfig
    value={{
      fetcher: async (url: string) => {
        const res = await fetch(url); // استفاده از URL درست در fetch
        // اگر وضعیت HTTP خارج از محدوده 200-299 باشد، خطا می‌دهیم.
        if (!res.ok) {
          const error: any = new Error(
            "An error occurred while fetching the data."
          );
          // اطلاعات اضافی را به شیء خطا اضافه می‌کنیم.
          error.info = await res.json();
          error.status = res.status;
          throw error;
        }
        return res.json();
      },
    }}
  >
    {children}
  </SWRConfig>
);

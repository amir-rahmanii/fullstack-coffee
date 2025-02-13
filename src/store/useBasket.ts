import { BasketItem } from '@/types/basket.types';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const basketKeyMain = process.env.BASKET_CART || "basket";

// محاسبه مجموع قیمت
const calculateTotalPrice = (basket: BasketItem[]): number =>
    basket.reduce((total, item) => total + item.priceWithDiscount * item.count, 0);

// نوع وضعیت
interface BasketState {
    basket: BasketItem[];
    totalPrice: number;
    addToBasket: (data: BasketItem) => void;
    removeFromBasket: (title: string, itemId: string) => void;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set) => ({
      basket: [],
      totalPrice: 0,
      addToBasket: (data: BasketItem) =>
        set((state) => {
          // بررسی وجود محصول در سبد
          const existingProductIndex = state.basket.findIndex((item) => item.id === data.id);

          let updatedBasket;
          if (existingProductIndex !== -1) {
            // به‌روزرسانی تعداد محصول در صورت وجود
            updatedBasket = state.basket.map((item, index) =>
              index === existingProductIndex
                ? { ...item, count: item.count + data.count }
                : item
            );
          } else {
            // افزودن محصول جدید به سبد
            updatedBasket = [...state.basket, data];
          }

          const updatedTotalPrice = calculateTotalPrice(updatedBasket);

          // نمایش پیام موفقیت
          toast.success(`${data.title} به سبد خرید اضافه شد!`, {
            duration: 2000,
            icon: "🛒",
          });

          return {
            basket: updatedBasket,
            totalPrice: updatedTotalPrice,
          };
        }),

      removeFromBasket: (title: string, itemId: string) =>
        set((state) => {
          const updatedBasket = state.basket.filter((item) => item.id !== itemId);
          const updatedTotalPrice = calculateTotalPrice(updatedBasket);

          toast.error(`${title} از سبد خرید حذف شد!`, {
            duration: 2000,
          });

          return {
            basket: updatedBasket,
            totalPrice: updatedTotalPrice,
          };
        }),
    }),
    {
      name: basketKeyMain, // specify the localStorage key
    }
  )
);

import { BasketItem } from '@/types/basket.types';
import toast from 'react-hot-toast';
import { create } from 'zustand';

const basketKeyMain = process.env.BASKET_CART || "basket";

// گرفتن مقدار اولیه از Local Storage
const getInitialBasket = (): BasketItem[] => {
    if (typeof window !== "undefined") {
        try {
            return JSON.parse(localStorage.getItem(basketKeyMain) || "[]");
        } catch (error) {
            console.error("Error parsing basket data:", error);
            return [];
        }
    }
    return [];
};

// محاسبه مجموع قیمت
const calculateTotalPrice = (basket: BasketItem[]): number =>
    basket.reduce((total, item) => total + item.priceWithDiscount * item.count, 0);

// نوع وضعیت
interface BasketState {
    basket: BasketItem[];
    totalPrice: number;
    addToBasket: (data: BasketItem) => void;
    removeFromBasket: (title : string , itemId: string) => void;
}

// تابع ذخیره‌سازی در Local Storage
const saveToLocalStorage = (key: string, data: BasketItem[]) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving basket data:", error);
    }
};

// پیاده‌سازی Zustand برای مدیریت وضعیت سبد خرید
export const useBasketStore = create<BasketState>((set) => ({
    basket: getInitialBasket(),
    totalPrice: calculateTotalPrice(getInitialBasket()),

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
            saveToLocalStorage(basketKeyMain, updatedBasket);

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

    removeFromBasket: (title : string , itemId: string) =>
        set((state) => {
            const updatedBasket = state.basket.filter((item) => item.id !== itemId);
            const updatedTotalPrice = calculateTotalPrice(updatedBasket);
            saveToLocalStorage(basketKeyMain, updatedBasket);

            toast.error(`${title} از سبد خرید حذف شد!`, {
                duration: 2000,
            });

            return {
                basket: updatedBasket,
                totalPrice: updatedTotalPrice,
            };
        }),
}));

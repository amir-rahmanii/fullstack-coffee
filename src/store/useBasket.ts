import { BasketItem } from '@/types/basket.types';
import { create } from 'zustand';

const basketKey = process.env.BASKET_CART;
const basketKeyMain = basketKey || "basket";

const getInitialBasket = () => {
    const getBasket: BasketItem[] = JSON.parse(localStorage.getItem(basketKeyMain) || "[]");
    return getBasket;
};

// تابع محاسبه مجموع قیمت
const calculateTotalPrice = (basket: BasketItem[]): number => {
    console.log(basket);
    return basket.reduce((total, item) => total + (item.priceWithDiscount * item.count), 0);
};

// تعریف نوع وضعیت
interface BasketState {
    basket: BasketItem[];
    totalPrice: number;
    addToBasket: (data: BasketItem) => void;
    removeFromBasket: (itemId: string) => void;
}

export const useBasketStore = create<BasketState>((set) => ({
    basket: getInitialBasket(),
    totalPrice: calculateTotalPrice(getInitialBasket()), // مقدار اولیه totalPrice
    addToBasket: (data: BasketItem) =>
        set((state) => {
            const updatedBasket = [...state.basket, data]; // افزودن داده جدید به سبد خرید
            const updatedTotalPrice = calculateTotalPrice(updatedBasket); // محاسبه مجموع قیمت جدید
            localStorage.setItem(basketKeyMain, JSON.stringify(updatedBasket));
            return {
                basket: updatedBasket, // به‌روزرسانی وضعیت basket
                totalPrice: updatedTotalPrice, // به‌روزرسانی totalPrice
            };
        }),
    removeFromBasket: (itemId: string) =>
        set((state) => {
            const updatedBasket = state.basket.filter(item => item.id !== itemId); // حذف آیتم از سبد خرید
            const updatedTotalPrice = calculateTotalPrice(updatedBasket); // محاسبه مجموع قیمت جدید
            localStorage.setItem(basketKeyMain, JSON.stringify(updatedBasket));
            return {
                basket: updatedBasket, // به‌روزرسانی وضعیت basket
                totalPrice: updatedTotalPrice, // به‌روزرسانی totalPrice
            };
        })
}));

import { create } from "zustand";

interface SideBarMobileType {
    isShowSideBarMobilePannel: boolean;
    updateIsShowSideBarMobilePannel: (value: boolean) => void;
}

export const useShowSideBarMobilePannel = create<SideBarMobileType>((set) => ({
    isShowSideBarMobilePannel: false, // مقدار پیش‌فرض
    updateIsShowSideBarMobilePannel: (value) => set({ isShowSideBarMobilePannel: value }),
}));

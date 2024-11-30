import { homeFill } from "@/components/icons/Svg/Svg";


export type MenuItemDashboard = {
    name: string;
    path: string;
    img?: React.ReactNode;
};

export const pathMenuDashboard: MenuItemDashboard[] = [
    {
        name: "خانه",
        path: "/dashboard",
        img: homeFill
    },
    {
        name: "کاربران",
        path: "/dashboard/users",
        img: homeFill
    },
    {
        name: "محصولات",
        path: "/dashboard/products",
        img: homeFill
    },
];

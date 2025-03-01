import { categoriesIcon, commentsIcon, homeFill, productsIcon, usersIcon } from "@/components/icons/Svg/Svg";
import { MenuItemDashboard } from "./pathDahboard";

export const pathMenuAccount: MenuItemDashboard[] = [
    {
        name: "خانه",
        path: "/dashboard",
        img: homeFill
    },
    {
        name: "آدرس ها",
        path: "/dashboard/users",
        img: usersIcon
    },
    {
        name: "سفارشات",
        path: "/dashboard/products",
        img: productsIcon
    }
];

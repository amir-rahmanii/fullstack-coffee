import { categoriesIcon, commentsIcon, homeFill, productsIcon, usersIcon } from "@/components/icons/Svg/Svg";


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
        img: usersIcon
    },
    {
        name: "محصولات",
        path: "/dashboard/products",
        img: productsIcon
    },
    {
        name: "دسته بندی محصولات",
        path: "/dashboard/category-products",
        img: categoriesIcon
    },
    {
        name: "کامنت ها",
        path: "/dashboard/comments",
        img: commentsIcon
    },
];

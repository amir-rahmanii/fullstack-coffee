import { brainCapesole, brainCombined, brainNoreska, brainProffesional, brainSperso, encyclopediaMagazine, healthMagazine } from "@/components/icons/Svg/Svg";

export type MenuItem = {
    name: string;
    path: string;
    img?: React.ReactNode;
    subMenu?: MenuItem[]
};

export const pathMenu: MenuItem[] = [
    {
        name: "محصولات خانگی",
        path: "mmmm",
        subMenu: [
            { name: "نورکسا", img: brainNoreska, path: "نورکسا" },
            { name: "کپسول اسپرسو", img: brainCapesole, path: "نورکسا" },
            {
                name: "قهوه اسپرسو",
                path: "نورکسا",
                img: brainSperso,
                subMenu: [
                    { name: "قهوه ترک", path: "قهوه ترک" },
                    { name: "قهوه فرانسه", path: "قهوه فرانسه" },
                ],
            },
        ],
    },
    {
        name: "محصولات هورکا",
        path: "mmmm",
        subMenu: [
            { name: "تخصصی", img: brainProffesional, path: "نورکسا" },
            { name: "ترکیبی", img: brainCombined, path: "نورکسا" },
        ],
    },
    {
        name: "مجله بن مانو",
        path: "mmmm",
        img: brainCapesole,
        subMenu: [
            { name: "دانشنامه", img: encyclopediaMagazine, path: "نورکسا" },
            { name: "سلامتی", img: healthMagazine, path: "نورکسا" },
        ],
    },
    { name: "تماس با ما", path: "mmmm" },
    { name: "درباره ما", path: "mmmm" },
];

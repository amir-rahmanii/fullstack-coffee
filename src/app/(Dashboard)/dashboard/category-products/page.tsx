'use client';

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import TableAdmin from "@/components/modules/TableAdmin/TableAdmin";
import ModalYesOrNoAdmin from "@/components/modules/Modal/ModalYesOrNoAdmin/ModalYesOrNoAdmin";
import { searchIcon, deleteIcon } from "@/components/icons/Svg/Svg";
import UserType from "@/types/user.types";
import { useDelete } from "@/hook/useDelete";
import AddCategoryProductAdmin from "@/components/template/AddCategoryProductAdmin/AddCategoryProductAdmin";
import CategoryProductType from "@/types/categoryProduct.types";
import LoadingSpinner from "@/components/modules/LoadingBox/LoadingSpinner";

export default function Users() {
  const columns: string[] = [
    "#",
    "نام دسته بندی",
    "تاریخ ثبت",
    "عملیات",
  ];

  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ساخت Query String برای جستجو
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );


  const { data: categories, mutate, isLoading, error } = useSWR<CategoryProductType[]>(
    `/api/category-product/getAll?search=${searchParams?.get("search") || ""}`
  );

  const { deleteItem, isMutating } = useDelete("/api/category-product/delete", {
    onSuccess: () => {
      alert("Item deleted successfully!");
      mutate();
    },
    onError: (error) => alert(`Error: ${error.message}`),
  });

  const handleDeleteCategoryProduct = async (id: string | number) => {
    await deleteItem(id);
  };

  // هندلر جستجو
  const handleSearch = () => {
    router.push(pathname + "?" + createQueryString("search", searchValue));
  };

  return (
    <div className="font-sans grid overflow-auto max-w-[710px] md:max-w-full md:w-full">
      <AddCategoryProductAdmin />
      <div className="bg-admin-navy rounded">
        <h3 className="text-xl px-6 pt-6 font-danaBold">دسته بندی محصولات</h3>
        <div className="px-6 pt-6 flex justify-end items-center">
          <form
            className="flex items-center gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <button
              onClick={handleSearch}
              className="text-admin-High w-5 h-5"
              type="button"
            >
              {searchIcon}
            </button>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-transparent text-white outline-none"
              placeholder="جستجو ..."
              type="text"
            />
          </form>
        </div>
        <TableAdmin columns={columns}>
          <tbody className="h-[200px] overflow-auto">
            {categories?.map((category, index) => (
              <tr
                key={category._id}
                className={`border-y text-sm even:bg-[#313D4A] text-center border-[#2e3a47]`}
              >
                <td className="py-[18px]  px-2 lg:px-1">{index + 1}</td>
                <td className="py-[18px]  px-2 lg:px-1">
                  <div className="flex items-center gap-2 justify-center">
                    {category.title}
                  </div>
                </td>
                <td className="py-[18px]  px-2 lg:px-1">
                  {new Date(category.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="py-[18px]  px-2 lg:px-1">
                  <div className="flex items-center justify-center gap-2">
                    <ModalYesOrNoAdmin
                      isMutating={isMutating}
                      isAttention={true}
                      submitHandler={() => handleDeleteCategoryProduct(category._id)}
                      title="حذف کاربر"
                      description={`آیا مایل به حذف ${category.title} هستید`}
                    >
                      <button
                        className={`w-4 h-4 text-admin-High hover:scale-110 hover:text-red-400 transition-all duration-300`}
                      >
                        {deleteIcon}
                      </button>
                    </ModalYesOrNoAdmin>
                  </div>
                </td>
              </tr>
            ))}
            {isLoading && (
              <tr>
                <td colSpan={columns.length}>
                  <LoadingSpinner showTitle={true} />
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center">
                    <p>خطا در بارگزاری دسته بندی محصولات</p>
                  </div>
                </td>
              </tr>
            )}
            {(!categories?.length && !error && !isLoading) && (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center">
                    <p>دسته بندی محصولات یافت نشد</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </TableAdmin>
      </div>
    </div>
  );
}

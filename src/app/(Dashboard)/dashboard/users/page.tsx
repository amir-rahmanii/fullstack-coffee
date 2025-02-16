"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import TableAdmin from "@/components/modules/TableAdmin/TableAdmin";
import ModalYesOrNoAdmin from "@/components/modules/Modal/ModalYesOrNoAdmin/ModalYesOrNoAdmin";
import { searchIcon, deleteIcon } from "@/components/icons/Svg/Svg";
import UserType from "@/types/user.types";
import { useDelete } from "@/hook/useDelete";
import useQueryString from "@/utils/createQueryString";
import LoadingSpinner from "@/components/modules/LoadingBox/LoadingSpinner";

export default function Users() {
  const columns: string[] = [
    "#",
    "نام کاربری",
    "ایمیل",
    "نقش",
    "تاریخ ثبت نام",
    "عملیات",
  ];

  const [searchValue, setSearchValue] = useState("");
  const { updateQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const currentSearch = searchParams?.get("search") || "";
  const [isShowDeleteProductModal, setIsShowDeleteProductModal] = useState(false);

  // دریافت کاربران با استفاده از SWR
  const { data: users, mutate, error, isLoading } = useSWR<UserType[]>(
    `/api/user/all?search=${currentSearch}`
  );

  const { deleteItem, isMutating } = useDelete("/api/user/delete", {
    onSuccess: () => {
      alert("Item deleted successfully!");
      mutate(); // بازخوانی لیست کاربران پس از حذف
    },
    onError: (error) => alert(`Error: ${error.message}`),
  });

  const handleDeleteUser = async (id: string | number) => {
    await deleteItem(id);
  };

  // هندلر جستجو
  const handleSearch = () => {
    updateQueryString("search", searchValue);
  };

  return (
    <div className="font-sans grid overflow-auto max-w-[710px] md:max-w-full md:w-full">
      <div className="bg-admin-navy rounded">
        <h3 className="text-xl px-6 pt-6 font-danaBold">کاربران</h3>
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
            {users?.map((user, index) => (
              <tr
                key={user._id}
                className={`border-y text-sm even:bg-[#313D4A] text-center border-[#2e3a47]`}
              >
                <td className="py-[18px]  px-2 lg:px-1">{index + 1}</td>
                <td className="py-[18px]  px-2 lg:px-1">
                  <div className="flex items-center gap-2 justify-center">
                    {user.username}
                  </div>
                </td>
                <td className="py-[18px]  px-2 lg:px-1">{user.email}</td>
                <td className="py-[18px]  px-2 lg:px-1">
                  {user.role === "ADMIN" ? "ادمین" : "کاربر"}
                </td>
                <td className="py-[18px]  px-2 lg:px-1">
                  {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="py-[18px]  px-2 lg:px-1">
                  <div className="flex items-center justify-center gap-2">
                    {user.username !== "Amirreza" && (
                      <ModalYesOrNoAdmin
                        isOpenModal={isShowDeleteProductModal}
                        setIsOpenModal={setIsShowDeleteProductModal}
                        isMutating={isMutating}
                        isAttention={true}
                        submitHandler={() => handleDeleteUser(user._id)}
                        title="حذف کاربر"
                        description={`آیا مایل به حذف ${user.username} هستید`}
                      >
                        <button
                          className={`w-4 h-4 text-admin-High hover:scale-110 hover:text-red-400 transition-all duration-300`}
                        >
                          {deleteIcon}
                        </button>
                      </ModalYesOrNoAdmin>
                    )}
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
                    <p>خطا در بارگزاری کاربران</p>
                  </div>
                </td>
              </tr>
            )}
            {(!users?.length && !error && !isLoading) && (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center">
                    <p>کاربری یافت نشد</p>
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

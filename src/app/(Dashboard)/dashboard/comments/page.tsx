"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import TableAdmin from "@/components/modules/TableAdmin/TableAdmin";
import ModalYesOrNoAdmin from "@/components/modules/Modal/ModalYesOrNoAdmin/ModalYesOrNoAdmin";
import { searchIcon, deleteIcon, eyeIcon, updateIcon } from "@/components/icons/Svg/Svg";
import { useDelete } from "@/hook/useDelete";
import useQueryString from "@/utils/createQueryString";
import LoadingSpinner from "@/components/modules/LoadingBox/LoadingSpinner";
import { ModifiedCommentType } from "@/types/comment.types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import usePostOrPut from "@/hook/usePostOrPut";

function Comments() {
  const columns: string[] = [
    "#",
    "نام",
    "ایمیل",
    "نمایش نظر",
    "محصول",
    "تاریخ ثبت",
    "وضعیت",
    "عملیات",
  ];

  const { updateQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const currentSearch = searchParams?.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [isShowDeleteCommentModal, setIsShowDeleteCommentModal] = useState(false);
  const [isShowActiveOrNotActiveModal, setIsShowActiveOrNotActiveModal] = useState(false);

  const { data: comments, mutate, error, isLoading } = useSWR<ModifiedCommentType[]>(
    `/api/comment/getAll?search=${currentSearch}`
  );

  const { deleteItem, isMutating } = useDelete("/api/comment/delete", {
    onSuccess: () => {
      setIsShowDeleteCommentModal(false)
      mutate();
    },
    onError: (error) => alert(`Error: ${error.message}`),
  });


  const { mutate: activeOrNotActive, isMutating: activeOrNotActiveIsMutating } = usePostOrPut(
    `/api/comment/activeOrNotActive`,
    "PUT",
    "Item changed successfully!",
    () => {
      setIsShowActiveOrNotActiveModal(false);
      mutate();
    }
  );

  const handleDeleteComment = async (id: string | number) => {
    await deleteItem(id);
  };

  const handleActiveOrNotActive = async (id: string | number) => {
      activeOrNotActive({commentId : id});
  };

  // هندلر جستجو
  const handleSearch = () => {
    updateQueryString("search", searchValue);
  };


  return (
    <div className="font-sans grid overflow-auto max-w-[710px] md:max-w-full md:w-full">
      <div className="bg-admin-navy rounded">
        <h3 className="text-xl px-6 pt-6 font-danaBold">کامنت ها</h3>
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
            {comments?.map((comment, index) => (
              <tr
                key={comment._id}
                className={`border-y text-sm even:bg-[#313D4A] text-center border-[#2e3a47]`}
              >
                <td className="py-[18px]  px-2 lg:px-1">{index + 1}</td>
                <td className="py-[18px]  px-2 lg:px-1">
                  <div className="flex items-center gap-2 justify-center">
                    {comment.name}
                  </div>
                </td>
                <td className="py-[18px]  px-2 lg:px-1">{comment.email}</td>
                <td className="py-[18px]  px-2 lg:px-1">
                  <div className="flex items-center justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className={`w-4 h-4 text-admin-High hover:scale-110 hover:text-green-400 transition-all duration-300`}
                        >
                          {eyeIcon}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-[90%] overflow-y-auto sm:max-w-[600px] lg:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>نظر کاربر {comment.name}</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <div className="child:text-center">
                          <p>{comment.description}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </td>
                <td className="py-[18px]  px-2 lg:px-1">
                  {comment.product.title}
                </td>
                <td className="py-[18px]  px-2 lg:px-1">
                  {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="py-[18px]  px-2 lg:px-1">
                  {comment.isActive ? "تایید شده" : "تایید نشده"}
                </td>
                <td className="py-[18px]  px-2 lg:px-1">
                  <div className="flex items-center justify-center gap-2">
                    <ModalYesOrNoAdmin
                      isOpenModal={isShowDeleteCommentModal}
                      setIsOpenModal={setIsShowDeleteCommentModal}
                      isMutating={isMutating}
                      isAttention={true}
                      submitHandler={() => handleDeleteComment(comment._id)}
                      title="حذف نظر"
                      description={`آیا مایل به حذف نظر ${comment.name} هستید`}
                    >
                      <button
                        className={`w-4 h-4 text-admin-High hover:scale-110 hover:text-red-400 transition-all duration-300`}
                      >
                        {deleteIcon}
                      </button>
                    </ModalYesOrNoAdmin>
                    {/* active or notactive */}
                    <ModalYesOrNoAdmin
                      isOpenModal={isShowActiveOrNotActiveModal}
                      setIsOpenModal={setIsShowActiveOrNotActiveModal}
                      isMutating={activeOrNotActiveIsMutating}
                      isAttention={true}
                      submitHandler={() => handleActiveOrNotActive(comment._id)}
                      title={` ${comment.isActive ? "رد" : "تایید"}  
                        نظر کاربر ${comment.name}
                        `}
                      description={`آیا مایل به
                         ${comment.isActive ? "رد" : "تایید"}
                         نظر ${comment.name} هستید`}
                    >
                      <button
                        className={`w-4 h-4 text-lg text-admin-High hover:scale-110 hover:text-rose-400 transition-all duration-300`}
                      >
                        {comment.isActive ? <IoClose /> : <TiTick />}
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
                    <p>خطا در بارگزاری کاربران</p>
                  </div>
                </td>
              </tr>
            )}
            {(!comments?.length && !error && !isLoading) && (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center">
                    <p>کامنتی یافت نشد</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </TableAdmin>
      </div>
    </div>
  )
}

export default Comments
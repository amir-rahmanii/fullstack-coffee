"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import TableAdmin from "@/components/modules/TableAdmin/TableAdmin";
import ModalYesOrNoAdmin from "@/components/modules/Modal/ModalYesOrNoAdmin/ModalYesOrNoAdmin";
import { searchIcon, deleteIcon, eyeIcon, updateIcon } from "@/components/icons/Svg/Svg";
import ProductTypes from "@/types/product.types";
import { useDelete } from "@/hook/useDelete";
import AddProductAdmin from "@/components/template/AddProductAdmin/AddProductAdmin";
import useQueryString from "@/utils/createQueryString";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import UpdateProductAdmin from "@/components/template/UpdateProductAdmin/UpdateProductAdmin";
import LoadingSpinner from "@/components/modules/LoadingBox/LoadingSpinner";


export default function Products() {
  const columns: string[] = [
    "#",
    "نام محصول",
    "دسته بندی",
    "قیمت",
    "وضعیت",
    "تاریخ ایجاد",
    "عملیات",
  ];

  const { updateQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams?.get("search") || ""
  );

  const [activeProduct, setActiveProduct] = useState<ProductTypes | null>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isShowDeleteProductModal , setIsShowDeleteProductModal]= useState(false);



  const { data: products, error, mutate, isLoading } = useSWR<ProductTypes[]>(
    `/api/product/getAll?search=${searchParams?.get("search") || ""}&sort=${searchParams?.get("sort") || "latest"}&stock=${searchParams?.get("stock") || "0"}`
  );

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight, // انتقال به انتهای صفحه
      behavior: "smooth", // انیمیشن نرم
    });
  }, [searchParams]); // هر زمان که searchParams تغییر کند


  const { deleteItem, isMutating } = useDelete("/api/product/delete", {
    onSuccess: () => {
      setIsShowDeleteProductModal(false);
      mutate(); // بازخوانی محصولات
    },
    onError: (error) => alert(`خطا: ${error.message}`),
  });

  const handleDeleteProduct = async (id: string | number) => {
    await deleteItem(id);
  };

  const handleSearch = () => {
    updateQueryString("search", searchValue);
  };

  const valueSelectedSortHandler = (value: string) => {
    updateQueryString("sort", value);
  }

  const isStockHandler = (value: boolean) => {
    updateQueryString("stock", value ? "1" : "0");
  }

  const openUpdateModal = (product: ProductTypes) => {
    console.log("Opening update modal for:", product); // Debug
    setActiveProduct(product);
  };


  return (
    <div className="font-sans grid overflow-auto max-w-[710px] md:max-w-full md:w-full">
      <AddProductAdmin />
      <div className="bg-admin-navy rounded">
        <h3 className="text-xl px-6 pt-6 font-danaBold">محصولات</h3>
        <div className="px-6 pt-6 flex justify-between items-center">
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
          <div className='flex gap-6 items-center'>
            <Select defaultValue={searchParams?.get("sort") || "latest"} onValueChange={valueSelectedSortHandler}>
              <SelectTrigger className="w-[280px] text-foreground">
                <SelectValue placeholder="مرتب سازی را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="latest">مرتب سازی بر اساس آخرین</SelectItem>
                  <SelectItem value="price-desc">مرتب سازی بر اساس گرانترین</SelectItem>
                  <SelectItem value="price">مرتب سازی بر اساس ارزانترین</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center px-4 gap-6 border h-12 rounded-md border-neutral-200">
              <Label htmlFor="airplane-mode">فقط کالاهای موجود</Label>
              <Switch defaultChecked={searchParams?.get("stock") === "1" ? true : false} onCheckedChange={isStockHandler} dir='ltr' id="airplane-mode" />
            </div>
          </div>
        </div>
        <TableAdmin columns={columns}>
          <tbody className="h-[200px] overflow-auto">
            {products?.map((product, index) => (
              <tr
                key={product._id}
                className={`border-y text-sm even:bg-[#313D4A] text-center border-[#2e3a47]`}
              >
                <td className="py-[18px] px-2 lg:px-1">{index + 1}</td>
                <td className="py-[18px] px-2 lg:px-1">{product.title}</td>
                <td className="py-[18px] px-2 lg:px-1">{product.category.title}</td>
                <td className="py-[18px] px-2 lg:px-1">{Number(product.priceWithDiscount).toLocaleString("fa-IR")} تومان</td>
                <td className="py-[18px] px-2 lg:px-1">{product.stock ? "موجود" : "ناموجود"}</td>
                <td className="py-[18px] px-2 lg:px-1">
                  {new Date(product.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="py-[18px] px-2 lg:px-1">
                  <div className="flex items-center justify-center gap-2">
                    {/* data product */}
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
                          <DialogTitle>اطلاعات محصول {product.title}</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <div className="flex items-center gap-6 flex-col lg:flex-row">
                          {product.images.map((img, index) => (
                            <div key={index} className="w-full h-full">
                              <Image className="w-full h-full object-cover rounded" width="480" height="140" alt={`img ${index}`} src={img} />
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 child:text-center">
                          <p>نام محصول : {product.title}</p>
                          <p> دسته بندی: {product.category.title}</p>
                          <p>قیمت بدون تخفیف :  {Number(product.price).toLocaleString("fa-IR")} تومان</p>
                          <p>درصد تخفیف : {product.discount} %</p>
                          <p> قیمت با تخفیف : {Number(product.priceWithDiscount).toLocaleString("fa-IR")} تومان</p>
                          <p>وزن : {product.weight} گرم</p>
                          <p>وضعیت موجودی : {product.stock ? "موجود" : "ناموجود"}</p>
                          <p> تاریخ ایجاد :   {new Date(product.createdAt).toLocaleDateString("fa-IR")}</p>
                          <p> اخرین به روز رسانی :   {new Date(product.updatedAt).toLocaleDateString("fa-IR")}</p>
                        </div>
                        <p className="text-center"> توضیحات : {product.description}</p>
                      </DialogContent>
                    </Dialog>

                    {/* delete product */}
                    <ModalYesOrNoAdmin
                      isOpenModal={isShowDeleteProductModal}
                      setIsOpenModal={setIsShowDeleteProductModal}
                      isMutating={isMutating}
                      isAttention={true}
                      submitHandler={() => handleDeleteProduct(product._id)}
                      title="حذف محصول"
                      description={`آیا مایل به حذف ${product.title} هستید؟`}
                    >
                      <button
                        className={`w-4 h-4 text-admin-High hover:scale-110 hover:text-red-400 transition-all duration-300`}
                      >
                        {deleteIcon}
                      </button>
                    </ModalYesOrNoAdmin>

                    {/* update product */}
                    <Dialog open={isOpenUpdateModal} onOpenChange={setIsOpenUpdateModal}>
                      <DialogTrigger asChild>
                        <button
                          className={`w-4 h-4 text-admin-High hover:scale-110 hover:text-orange-400 transition-all duration-300`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openUpdateModal(product)
                          }}
                        >
                          {updateIcon}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="w-full overflow-y-auto max-w-[90%] sm:max-w-[600px] lg:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>ویرایش محصول {activeProduct?.title}</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        {activeProduct && (
                          <UpdateProductAdmin setIsOpenUpdateModal={setIsOpenUpdateModal} product={activeProduct} />
                        )}
                      </DialogContent>
                    </Dialog>

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
                    <p>خطا در بارگزاری محصولات</p>
                  </div>
                </td>
              </tr>
            )}
            {(!products?.length && !error && !isLoading) && (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center">
                    <p>محصولی یافت نشد</p>
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

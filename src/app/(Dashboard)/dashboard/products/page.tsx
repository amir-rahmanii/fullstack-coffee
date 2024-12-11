"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import TableAdmin from "@/components/modules/TableAdmin/TableAdmin";
import ModalAdmin from "@/components/modules/ModalAdmin/ModalAdmin";
import { searchIcon, deleteIcon } from "@/components/icons/Svg/Svg";
import ProductTypes from "@/types/product.types";
import { useDelete } from "@/hook/useDelete";
import AddProductAdmin from "@/components/template/AddProductAdmin/AddProductAdmin";
import useQueryString from "@/utils/createQueryString";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Products() {
  const columns: string[] = [
    "#",
    "نام محصول",
    "دسته بندی",
    "قیمت",
    "تاریخ ایجاد",
    "عملیات",
  ];

  const { updateQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const currentSearch = searchParams?.get("search") || "";
  const [searchValue, setSearchValue] = useState<string>(
    searchParams?.get("search") || ""
  );
  const [sortedValue] = useState(searchParams?.get("sort") || "")

  // دریافت محصولات
  const { data: products, error, mutate } = useSWR<ProductTypes[]>(
    `/api/product/getAll?search=${currentSearch}`
  );

  const { deleteItem } = useDelete("/api/product/delete", {
    onSuccess: () => {
      alert("محصول با موفقیت حذف شد");
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
  
  const valueSelectedSortHandler = (value : string) => {
    updateQueryString("sort", value);
  }

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
            <Select defaultValue={sortedValue} onValueChange={valueSelectedSortHandler}>
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
              <Switch dir='ltr' id="airplane-mode" />
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
                <td className="py-[18px] px-2 lg:px-1">{product.price}</td>
                <td className="py-[18px] px-2 lg:px-1">
                  {new Date(product.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="py-[18px] px-2 lg:px-1">
                  <div className="flex items-center justify-center gap-2">
                    <ModalAdmin
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
                    </ModalAdmin>
                  </div>
                </td>
              </tr>
            ))}
            {error && (
              <tr>
                <td colSpan={columns.length}>خطا در بارگذاری محصولات</td>
              </tr>
            )}
            {!products?.length && !error && (
              <tr>
                <td colSpan={columns.length}>محصولی یافت نشد</td>
              </tr>
            )}
          </tbody>
        </TableAdmin>
      </div>
    </div>
  );
}

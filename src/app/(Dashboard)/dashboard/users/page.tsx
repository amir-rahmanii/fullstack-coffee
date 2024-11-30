"use client";

import { useState } from 'react';
// import useGetData from '../../hooks/useGetData';
// import { userInformation } from '../../hooks/user/user.types';
// import SkeletonTable from '../../Components/SkeletonTable/SkeletonTable';
import TableAdmin from '@/components/modules/TableAdmin/TableAdmin';
import { banUser, changeRoleIcon, deleteIcon, eyeIcon, searchIcon, unBanUser } from '@/components/icons/Svg/Svg';
import Image from 'next/image';
import ModalAdmin from '@/components/modules/ModalAdmin/ModalAdmin';
import useSWR from 'swr';
import UserType from '@/types/user.types';





export default function Users() {
    const columns: string[] = [
        "#",
        "نام کاربری",
        "ایمیل",
        "نقش",
        "تاریخ ثبت نام",
        "عملیات"
    ]
    const [isShowChangeRole, setIsShowChangeRole] = useState(false)
    const [isShowDeleteUser, setIsShowDeleteUser] = useState(false)
    const [isShowBanUser, setIsShowBanUser] = useState(false)
    const [isShowInfoUser, setIsShowInfoUser] = useState(false)
    const [infoUser, setIsInfoUser] = useState<null>(null)
    const [searchValue, setSearchValue] = useState("")
    const [filteredData, setFilteredData] = useState<null>(null)



    // get all users
    const { data : allUsers } = useSWR<UserType[]>('/api/user/all');


    console.log(allUsers);
    


    return (
        <>
            <div className="font-sans grid overflow-auto max-w-[710px] md:max-w-full md:w-full">
                <div className='bg-admin-navy rounded'>
                    <h3 className='text-xl px-6 pt-6 font-danaBold'>کاربران</h3>
                    <div className='px-6 pt-6 flex justify-end items-center'>
                        <form className='flex items-center gap-4' onSubmit={e => e.preventDefault()}>
                            <button className='text-admin-High w-5 h-5'>
                                {searchIcon}
                            </button>
                            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='bg-transparent text-white outline-none' placeholder='جستجو ...' type="text" />
                        </form>
                    </div>
                    <TableAdmin columns={columns}>
                        <tbody className='h-[200px] overflow-auto' >
                            {allUsers?.map((user , index) => (
                            <tr key={user._id} className={`border-y text-sm even:bg-[#313D4A] text-center border-[#2e3a47]`}>
                                <td className='py-[18px]  px-2 lg:px-1'>{index + 1}</td>
                                <td className='py-[18px]  px-2 lg:px-1'>
                                    <div className='flex items-center gap-2 justify-center'>
                                        {user.username}
                                    </div>
                                </td>
                                <td className='py-[18px]  px-2 lg:px-1'>{user.email}</td>
                                <td className='py-[18px]  px-2 lg:px-1'>{user.role === "ADMIN" ? "ادمین" : "کاربر"}</td>
                                <td className='py-[18px]  px-2 lg:px-1'>{new Date(user.createdAt).toLocaleDateString('fa-IR')}</td>
                                <td className='py-[18px]  px-2 lg:px-1'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <ModalAdmin
                                            isAttention={true}
                                        >
                                            <button className={`w-4 h-4 text-admin-High hover:scale-110 hover:text-yellow-400 transition-all duration-300`}>{eyeIcon}</button>
                                        </ModalAdmin>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </TableAdmin>
                    {/* ) : (
                            <div>
                                <p className='text-center text-xl py-3'>
                                    No user found with this username or name or email 😩
                                </p>
                            </div>
                        )} */}
                </div>
            </div>
        </>
    );
}

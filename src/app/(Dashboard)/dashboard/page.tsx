"use client";
import { messageOutline, productsIcon, usersIcon } from '@/components/icons/Svg/Svg';
import BoxHome from '@/components/modules/BoxHomeAdmin/BoxHomeAdmin';
import SkeletonModel from '@/components/modules/SkeletonModel/SkeletonModel';
import countAllDataTypes from '@/types/countData.types';
import useSWR from 'swr';




function Index() {

  const { data: counts, error, isLoading } = useSWR<countAllDataTypes>(
    "/api/countData"
  );

  console.log(counts);

  if (error) {
    return (
      <div>
        <p>خطا در برگزاری اطلاعات</p>
      </div>
    )
  }


  return (
    <>
      <div className='font-sans grid gap-8 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index}>
                <SkeletonModel />
              </div>
            ))
          ) : (
            <>
              <BoxHome svg={usersIcon} title="تعداد کاربران" count={counts?.countUser || 0} growth={50} />
              <BoxHome svg={productsIcon} title="تعداد محصولات" count={counts?.countProduct || 0} growth={25} />
              <BoxHome svg={messageOutline} title="تعداد سفارشات" count={20} growth={35} />
            </>
          )}
        </div>

        <div className='grid lg:grid-cols-1 xl:grid-cols-3 gap-8'>
          <div className='bg-admin-navy p-[30px] rounded'>
            <p className='text-xl'>Operating System Chart</p>
            {/* {isSuccessTotalOsCount && (
                <OperatingSystemChart totalOsCount={totalOsCount} />
              )} */}
          </div>
          <div className='bg-admin-navy p-[30px] xl:col-span-2 rounded'>
            <p className='text-xl'>Messages By Month Chart</p>
            {/* {isSuccessTotalMessageCount && (
                <MessagesByMonthChart totalMessageCount={totalMessageCount} />
              )} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
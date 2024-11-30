

import { messageOutline,usersIcon } from '@/components/icons/Svg/Svg';
import BoxHome from '@/components/modules/BoxHomeAdmin/BoxHomeAdmin';



function Index() {

  return (
    <>
        <div className='font-sans grid gap-8 w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            <BoxHome svg={usersIcon} title="Users" count={20} growth={0} />
            <BoxHome svg={usersIcon} title="Tickets" count={20} growth={ 0} />
            <BoxHome svg={messageOutline} title="Messages" count={20} growth={0} />
            <BoxHome svg={usersIcon} title="Posts" count={12} growth={0} />
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
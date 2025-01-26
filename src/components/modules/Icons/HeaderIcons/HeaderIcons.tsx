import React from 'react'


type HeaderIconsProps = {
    children : React.ReactNode
}


function HeaderIcons({children} : HeaderIconsProps) {
    return (
        <button className='rounded-full cursor-pointer flex justify-center items-center w-[32px] h-[32px] border-2 border-darknes bg-background p-0.5 hover:border-veronese transition-all duration-500'>
            <div className='bg-goldnes w-full h-full rounded-full flex justify-center items-center'>
                {children}
            </div>
        </button>
    )
}

export default HeaderIcons
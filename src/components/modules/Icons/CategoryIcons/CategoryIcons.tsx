import { greenSperso } from '@/components/icons/Svg/Svg'
import React from 'react'


type CategoryIconsIcons = {
    isActiveCategory : boolean,
    changeCategoryHandler : () => void
}

function CategoryIcons({isActiveCategory , changeCategoryHandler} : CategoryIconsIcons) {
  return (
    <button
    onClick={changeCategoryHandler}
    className="w-14 h-14 p-1 border border-lightnes hover:border-veronese transition-all duration-500 cursor-pointer rounded-full flex justify-center items-center"
>
    <div
        className={`${isActiveCategory
            ? 'bg-veronese'
            : 'bg-lightnes'
            } w-full h-full p-3 rounded-full flex justify-center items-center`}
    >
        <div
            className={`w-full h-full ${isActiveCategory
                ? 'text-background'
                : 'text-veronese'
                }`}
        >
            {greenSperso}
        </div>
    </div>
</button>
  )
}

export default CategoryIcons
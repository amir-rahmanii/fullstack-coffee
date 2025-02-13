import CommentType from '@/types/comment.types';
import React from 'react'
import { FaRegUser } from 'react-icons/fa6'
import { MdOutlineDateRange } from "react-icons/md";

function CommentBox(props : CommentType) {
    return (
        <div className='border border-[#D9D9D0] rounded-xl w-full min-h-28 p-5'>
            {/* Name and date  */}
            <div className='flex justify-between items-center'>
                {/* name */}
                <div className='flex items-center gap-1.5 text-sm'>
                    <div className='bg-[#1D1D1B] rounded-full p-1'>
                        <FaRegUser className='text-lightnes text-lg' />
                    </div>
                    <p>{props.name}</p>
                </div>
                {/* date */}
                <div className='flex items-center gap-1.5 text-sm'>
                    <div className='bg-veronese rounded-full p-1'>
                        <MdOutlineDateRange className='text-lightnes text-lg' />
                    </div>
                    <p className='text-veronese'>{props.createdAt.toLocaleDateString("fa-IR")}</p>
                    <p className='text-veronese'>{props.createdAt.toLocaleTimeString("fa-IR").slice(0,5)}</p>
                </div>
            </div>
            {/* body */}
            <p className='mt-3'>{props.description}</p>
        </div>
    )
}

export default CommentBox
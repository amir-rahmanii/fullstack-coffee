import CommentBox from '@/components/modules/CommentBox/CommentBox'
import React from 'react'
import AddComment from '../AddComment/AddComment'
import CommentType from '@/types/comment.types'

function AllComments({ productId, comments }: { productId: string, comments: CommentType[] }) {
    return (
        <div>
            <p className='text-center text-2xl'>نظرات کاربران</p>
            <div className='container'>
                <div className='mt-8 flex flex-col gap-4 xl:px-44 items-center justify-center'>
                    {comments.map(data => (
                        <CommentBox key={data._id} {...data} />
                    ))}
                    <AddComment productId={productId} />
                </div>
            </div>
        </div>
    )
}

export default AllComments
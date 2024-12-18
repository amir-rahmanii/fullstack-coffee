import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function SkeletonModel() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] bg-admin-High w-[250px] rounded-xl" />
            {/* <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div> */}
        </div>
    )
}

export default SkeletonModel
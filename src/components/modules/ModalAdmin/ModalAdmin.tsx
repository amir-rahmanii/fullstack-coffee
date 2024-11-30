import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { closeIcon } from '@/components/icons/Svg/Svg'
import Image from 'next/image'

type ModalProps = {
    title?: string,
    submitHandler?: () => void,
    btnNoTitle?: string,
    btnYesTitle?: string,
    isAttention?: boolean,
    isYesOrNo?: boolean,
    children?: React.ReactNode
}

function ModalAdmin({
    isAttention,
    children,
    isYesOrNo,
    title,
    btnNoTitle,
    btnYesTitle,
    submitHandler
}: ModalProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <div className='flex justify-end'>
                    <AlertDialogCancel>
                        <button className='flex p-1'>
                            {closeIcon}
                        </button>
                    </AlertDialogCancel>
                </div>
                <AlertDialogHeader>
                    <div className='flex justify-center items-center'>
                        {isAttention && (
                            <Image className='rounded-xl' alt='attention' width={120} height={50} src="/images/attention.png" />
                        )}
                    </div>
                    <AlertDialogTitle>بیسبیسبیب</AlertDialogTitle>
                    <AlertDialogDescription>
                        سشیتسشیتاسشنیاسنشتی
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>لغو</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ModalAdmin
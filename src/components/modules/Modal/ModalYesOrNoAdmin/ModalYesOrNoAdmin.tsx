import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'

type ModalProps = {
    title?: string,
    submitHandler?: () => void,
    isAttention?: boolean,
    isYesOrNo?: boolean,
    description?: string,
    children?: React.ReactNode
}

function ModalYesOrNoAdmin({
    isAttention,
    children,
    description,
    title,
    submitHandler
}: ModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center items-center">
                    {isAttention && (
                        <Image src={'/images/attention.png'} alt='attention' width={120} height={50} />
                    )}
                </div>
                <DialogFooter>
                    <Button className='w-full rounded-xl' variant="default" size='default' type="submit" onClick={submitHandler}>تایید</Button>
                    <DialogClose asChild>
                        <Button className='w-full rounded-xl' variant="destructive" size='default'>لغو</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalYesOrNoAdmin
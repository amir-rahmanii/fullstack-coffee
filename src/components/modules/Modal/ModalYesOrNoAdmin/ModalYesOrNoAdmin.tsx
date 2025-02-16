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
import LoadingSpinner from '../../LoadingBox/LoadingSpinner'

type ModalProps = {
    isOpenModal : boolean,
    setIsOpenModal : (value : boolean) => void,
    title?: string,
    submitHandler?: () => void,
    isAttention?: boolean,
    isYesOrNo?: boolean,
    description?: string,
    isMutating?: boolean,
    children?: React.ReactNode
}

function ModalYesOrNoAdmin({
    isOpenModal,
    setIsOpenModal,
    isMutating,
    isAttention,
    children,
    description,
    title,
    submitHandler
}: ModalProps) {
    return (
        <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-full overflow-y-auto max-w-lg">
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
                    <Button disabled={isMutating} className='w-full rounded-xl' variant="default" size='default' type="submit" onClick={submitHandler}>
                        {isMutating ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                تایید
                            </>
                        )}
                    </Button>
                    <DialogClose asChild>
                        <Button className='w-full rounded-xl' variant="destructive" size='default'>لغو</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalYesOrNoAdmin
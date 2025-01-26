import { BasketItem } from '@/types/basket.types';
import Image from 'next/image';
import React from 'react';
import { IoClose } from 'react-icons/io5';

interface CartProductProps extends BasketItem {
    removeFromBasket: (title : string , id: string) => void;
}

const CartProduct: React.FC<CartProductProps> = ({ id, image, title, count, priceWithDiscount, removeFromBasket }) => {
    return (
        <div className="bg-lightnes relative flex gap-4 overflow-hidden p-2.5 mb-2.5 rounded-2xl">
            {/* Product Image */}
            <Image
                className="border border-veronese rounded-xl"
                width={70}
                height={70}
                src={image}
                alt={title}
            />
            <div className="flex flex-col gap-2">
                {/* Product Title */}
                <span className="text-[15px] text-darknes">{title}</span>
                {/* Product Price */}
                <div className="px-2.5 py-1 border border-[#d9d9d9] rounded-xl">
                    <span className="text-darknes text-[15px]">
                        {count} × {priceWithDiscount.toLocaleString()} تومان
                    </span>
                </div>
            </div>
            {/* Delete Product Button */}
            <button
                onClick={() => removeFromBasket(title , id)}
                className="bg-[#FCEBEB] absolute left-0 top-0 p-1.5 rounded-br-lg"
                aria-label={`حذف ${title}`}
            >
                <IoClose className="text-red-500 text-xl" />
            </button>
        </div>
    );
};

export default CartProduct;

"use client";
import Image from "next/image";
import React from "react";
import { ICartItem } from "@/types/index";
import { useCartStore } from "@/store/cart-store";
import { Trash2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "../common/DateRangePicker";
import Counter from "../common/Counter";

const CartItem = ({
    cartItem,
    disabled,
}: {
    cartItem: ICartItem;
    disabled?: boolean;
}) => {
    const { accommodation, startDate, endDate, quantity } = cartItem;
    const { decreaseQuantity, increaseQuantity, removeFromCart, setDuration } =
        useCartStore();
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: startDate ? new Date(startDate) : undefined,
        to: endDate ? new Date(endDate) : undefined,
    });

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex gap-5 lg:w-2/5">
                <Image
                    src={accommodation.images[0]}
                    alt="accommodation image"
                    width={150}
                    height={0}
                    sizes="100vw"
                    className="object-cover rounded-xl w-[150px] h-[150px]"
                    priority
                />
                <div className="flex flex-col justify-between gap-1">
                    <div className="flex flex-col gap-1">
                        <h5 className="font-bold text-lg">
                            {accommodation.title}
                        </h5>
                        <span className="text-sm text-gray-600">
                            {accommodation.bed}
                        </span>
                        <span className="text-primary font-semibold">
                            ${accommodation.price}
                        </span>
                    </div>
                    {!disabled && (
                        <Trash2
                            className="w-4 h-4 text-gray-600 cursor-pointer"
                            onClick={() => removeFromCart(accommodation.id)}
                        />
                    )}
                </div>
            </div>
            <div className="flex gap-5 justify-between mb-10 lg:mb-0">
                <DateRangePicker
                    date={date}
                    setDate={setDate}
                    className={`${
                        disabled && "pointer-events-none opacity-80"
                    }`}
                    onSelect={(durationDate) =>
                        setDuration(
                            accommodation.id,
                            durationDate?.from,
                            durationDate?.to
                        )
                    }
                />
                <Counter
                    disabled={disabled}
                    quantity={quantity}
                    onDecrease={() => decreaseQuantity(accommodation.id)}
                    onIncrease={() => increaseQuantity(accommodation.id)}
                />
            </div>
        </div>
    );
};

export default CartItem;

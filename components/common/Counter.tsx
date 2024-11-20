import { MinusCircle, PlusCircle } from "lucide-react";
import React from "react";

const Counter = ({
    quantity,
    onDecrease,
    onIncrease,
    disabled,
}: {
    quantity: number;
    onDecrease: () => void;
    onIncrease: () => void;
    disabled?: boolean;
}) => {
    return (
        <div className="flex items-center gap-3">
            {!disabled ? (
                <>
                    <MinusCircle
                        className="w-5 h-5 cursor-pointer"
                        onClick={onDecrease}
                    />
                    <span className="text-lg font-bold">{quantity}</span>
                    <PlusCircle
                        className="w-5 h-5 cursor-pointer"
                        onClick={onIncrease}
                    />
                </>
            ) : (
                <span className="text-lg font-bold">{quantity}</span>
            )}
        </div>
    );
};

export default Counter;

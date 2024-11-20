"use client";
import { useCartStore } from "@/store/cart-store";
import React from "react";
import ArrowHoverButton from "./common/ArrowHoverButton";
import { IAccommodation } from "@/types";

const AddToCartButton = ({
    accommodation,
}: {
    accommodation: IAccommodation;
}) => {
    const { addToCart } = useCartStore();
    return (
        <ArrowHoverButton
            onClick={() =>
                addToCart({
                    accommodation,
                    quantity: 1,
                })
            }
        >
            Book now
        </ArrowHoverButton>
    );
};

export default AddToCartButton;

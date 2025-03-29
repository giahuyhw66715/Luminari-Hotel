"use client";
import { useCartStore } from "@/store/cart-store";
import React from "react";
import { IAccommodation } from "@/types";
import ArrowHoverButton from "../common/ArrowHoverButton";

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

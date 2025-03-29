"use client";
import React from "react";
import Banner from "@/components/common/Banner";
import Heading from "@/components/common/Heading";
import { useCartStore } from "@/store/cart-store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EPaymentMethod } from "@/types";
import { createBooking } from "@/lib/actions/bookingActions";
import CartItem from "@/components/cart/CartItem";

const CartPage = () => {
    const { cart, total } = useCartStore();
    const { user } = useUser();
    const router = useRouter();

    const handleCheckoutOnline = async () => {
        try {
            if (!user) {
                router.push("/sign-in");
            } else {
                const customer = {
                    clerkId: user.id,
                    email: user.emailAddresses[0].emailAddress,
                    name: user.fullName,
                };

                const isSelectedDate = cart.every(
                    (item) => item.startDate && item.endDate
                );
                if (!isSelectedDate) {
                    return toast.error(
                        "Please select a start date and end date"
                    );
                }
                const response = await fetch(`/api/checkout`, {
                    method: "POST",
                    body: JSON.stringify({
                        cart,
                        customer,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                });
                const data = await response.json();
                router.push(data.url);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckoutAtHotel = async () => {
        try {
            if (!user) {
                router.push("/sign-in");
            } else {
                const isSelectedDate = cart.every(
                    (item) => item.startDate && item.endDate
                );
                if (!isSelectedDate) {
                    return toast.error(
                        "Please select a start date and end date"
                    );
                }

                const booking = {
                    customerClerkId: user.id,
                    bookingItems: cart,
                    total: total,
                    method: EPaymentMethod.CASH,
                };

                const response = await createBooking(booking);
                if (response.success) {
                    toast.success(response.message);
                    router.push("/booking-success");
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Banner image="/cart-banner.jpg" title="Cart" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 my-10 container py-10">
                <div className="flex flex-col gap-5">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <CartItem
                                key={item.accommodation.id}
                                cartItem={item}
                            />
                        ))
                    ) : (
                        <Heading className="m-0" underline={false}>
                            There are no items in your cart.
                        </Heading>
                    )}
                </div>
                <div>
                    <Heading className="m-0 capitalize" underline={false}>
                        Summary
                    </Heading>
                    <div className="flex items-center justify-between font-bold py-2">
                        <span>Total</span>
                        <span className="text-lg">${total}</span>
                    </div>
                    <Button
                        size="lg"
                        className="mt-4 w-full rounded-full"
                        onClick={handleCheckoutOnline}
                    >
                        Checkout online
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="mt-4 w-full rounded-full"
                        onClick={handleCheckoutAtHotel}
                    >
                        Checkout at Hotel
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CartPage;

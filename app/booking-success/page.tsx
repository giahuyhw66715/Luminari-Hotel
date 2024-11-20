"use client";

import Heading from "@/components/common/Heading";
import { useCartStore } from "@/store/cart-store";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const BookingSuccessfullyPage = () => {
    const { clearCart } = useCartStore();

    useEffect(() => {
        clearCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-screen flex items-center justify-center gap-5 pt-20">
            <Image
                src="/booking-success.svg"
                width={400}
                height={400}
                alt="success"
                priority
            />
            <div className="bg-white shadow-md rounded-xl py-5 px-20 flex items-center justify-center flex-col gap-5">
                <CircleCheck className="w-16 h-16 text-green-500" />
                <Heading
                    className="text-2xl my-0 text-green-500"
                    underline={false}
                >
                    Booking Successfully
                </Heading>
                <p>Thank you for booking our accommodation</p>
                <Link
                    href="/"
                    className="text-primary font-semibold cursor-pointer"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default BookingSuccessfullyPage;

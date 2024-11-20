import React from "react";
import { Eye } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import CartItem from "./CartItem";
import { v4 } from "uuid";
import { ICartItem } from "@/types";

const BookingDetailDialog = ({
    bookingItems,
}: {
    bookingItems: ICartItem[];
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Eye className="w-5 h-5 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Your Accommodation</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                {bookingItems?.map((item) => (
                    <CartItem key={v4()} cartItem={item} disabled />
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default BookingDetailDialog;

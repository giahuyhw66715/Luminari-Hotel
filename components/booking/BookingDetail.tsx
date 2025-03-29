import { IBooking } from "@/types";
import Image from "next/image";
import React from "react";
import BookingDetailDialog from "./BookingDetailDialog";

const BookingDetail = async ({ booking }: { booking: IBooking }) => {
    const firstAccommodation = booking.bookingItems[0]?.accommodation;

    return (
        <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-lg">
            <Image
                src={firstAccommodation?.images[0] || ""}
                width={0}
                height={0}
                sizes="100vw"
                className="w-24 h-24 rounded-xl object-cover"
                alt="booking"
                priority
            />
            <div className="flex flex-col gap-1">
                <RowInfo label="Booking ID" value={booking.id} />
                <RowInfo label="Total" value={`${booking.total}$`} />
                <RowInfo label="Payment method" value={booking.method} />
                <RowInfo
                    label="Booking Date"
                    value={booking.createdAt?.toLocaleDateString() || ""}
                />
                <BookingDetailDialog bookingItems={booking.bookingItems} />
            </div>
        </div>
    );
};

const RowInfo = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex items-center gap-2">
            <strong>{label}:</strong>
            <span>{value}</span>
        </div>
    );
};

export default BookingDetail;

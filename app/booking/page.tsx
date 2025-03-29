import React from "react";
import Heading from "@/components/common/Heading";
import Banner from "@/components/common/Banner";
import BookingDetail from "@/components/booking/BookingDetail";
import { IBooking } from "@/types";
import { getBookings } from "@/lib/actions/bookingActions";
import { currentUser } from "@clerk/nextjs/server";

const CustomerBookingPage = async () => {
    const user = await currentUser();
    const bookings = await getBookings(user?.id);

    return (
        <div>
            <Banner image="/cart-banner.jpg" title="Booking" />
            <div className="container py-10">
                {bookings?.length === 0 ? (
                    <Heading className="mx-0" underline={false}>
                        You have no bookings
                    </Heading>
                ) : (
                    <>
                        <Heading className="mt-10">Your booking</Heading>
                        <div className="grid grid-cols-2 gap-3">
                            {bookings?.map((booking) => (
                                <BookingDetail
                                    key={booking.id}
                                    booking={booking as unknown as IBooking}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CustomerBookingPage;

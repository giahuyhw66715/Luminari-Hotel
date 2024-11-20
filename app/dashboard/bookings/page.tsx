import { bookingColumns } from "@/components/columns/booking-columns";
import DashboardHeading from "@/components/common/DashboardHeading";
import { DataTable } from "@/components/ui/data-table";
import { getBookings } from "@/lib/actions/bookingActions";
import { IBooking } from "@/types";
import React from "react";

const BookingDashboardPage = async () => {
    const bookings = await getBookings();
    return (
        <div>
            <DashboardHeading
                heading="Bookings"
                buttonText="Create service"
                href="/dashboard/bookings/create"
            />
            <div className="py-10">
                <DataTable
                    columns={bookingColumns as IBooking[]}
                    data={bookings || []}
                />
            </div>
        </div>
    );
};

export default BookingDashboardPage;

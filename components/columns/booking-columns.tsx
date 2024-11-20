"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../common/ConfirmationDialog";
import { IBooking } from "@/types";
import { deleteBooking } from "@/lib/actions/bookingActions";
import BookingDetailDialog from "../BookingDetailDialog";

export const bookingColumns: ColumnDef<IBooking>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "customerClerkId",
        header: "Customer Clerk ID",
    },
    {
        accessorKey: "method",
        header: "Payment method",
    },
    {
        accessorKey: "total",
        header: "Total",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const booking = row.original;
            async function handleDeleteBooking() {
                const response = await deleteBooking(booking.id);
                if (response.success) {
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            }
            return (
                <div className="flex items-center gap-2">
                    <BookingDetailDialog bookingItems={booking.bookingItems} />
                    <DeleteConfirmationDialog
                        trigger={<Trash2 className="h-5 w-5" />}
                        title="Delete booking?"
                        description="This action cannot be undone. This will permanently delete your booking data from the server."
                        onClick={handleDeleteBooking}
                    />
                </div>
            );
        },
    },
];

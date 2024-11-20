"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IAccommodation } from "@/types";
import Link from "next/link";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../common/ConfirmationDialog";
import { deleteAccommodation } from "@/lib/actions/accommodationActions";

export const accommodationColumns: ColumnDef<IAccommodation>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="p-0"
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <p className="line-clamp-3">{row.getValue("description")}</p>
            );
        },
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const accommodation = row.original;
            async function handleDeleteAccommodation() {
                const response = await deleteAccommodation(accommodation.id);
                if (response.success) {
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            }
            return (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/dashboard/accommodations/edit/${accommodation.id}`}
                    >
                        <SquarePen className="h-5 w-5" />
                    </Link>
                    <DeleteConfirmationDialog
                        trigger={<Trash2 className="h-5 w-5" />}
                        title="Delete accommodation?"
                        description="This action cannot be undone. This will permanently delete your accommodation data from the server."
                        onClick={handleDeleteAccommodation}
                    />
                </div>
            );
        },
    },
];

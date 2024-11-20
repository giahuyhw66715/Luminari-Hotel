"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IAmenity } from "@/types";
import parse from "html-react-parser";
import Link from "next/link";
import { toast } from "sonner";
import { deleteAmenity } from "@/lib/actions/amenityActions";
import DeleteConfirmationDialog from "../common/ConfirmationDialog";

export const amenityColumns: ColumnDef<IAmenity>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="p-0"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "icon",
        header: "Icon",
        cell: ({ row }) => {
            return <div>{parse(row.getValue("icon"))}</div>;
        },
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const amenity = row.original;
            async function handleDeleteAmenity() {
                const response = await deleteAmenity(amenity.id);
                if (response.success) {
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            }
            return (
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/amenities/edit/${amenity.id}`}>
                        <SquarePen className="h-5 w-5" />
                    </Link>
                    <DeleteConfirmationDialog
                        trigger={<Trash2 className="h-5 w-5" />}
                        title="Are you sure you want to delete?"
                        description="This action cannot be undone. This will permanently delete your amenity data from the server."
                        onClick={handleDeleteAmenity}
                    />
                </div>
            );
        },
    },
];

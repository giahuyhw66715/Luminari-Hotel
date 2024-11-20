"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../common/ConfirmationDialog";
import { ICollection } from "@/types";
import { deleteCollection } from "@/lib/actions/collectionActions";

export const collectionColumns: ColumnDef<ICollection>[] = [
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
        accessorKey: "slug",
        header: "Slug",
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
            const collection = row.original;
            async function handleDeleteCollection() {
                const response = await deleteCollection(collection.id);
                if (response.success) {
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            }
            return (
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/collections/edit/${collection.id}`}>
                        <SquarePen className="h-5 w-5" />
                    </Link>
                    <DeleteConfirmationDialog
                        trigger={<Trash2 className="h-5 w-5" />}
                        title="Delete collection?"
                        description="This action cannot be undone. This will permanently delete your collection data from the server."
                        onClick={handleDeleteCollection}
                    />
                </div>
            );
        },
    },
];

import { collectionColumns } from "@/components/columns/collection-columns";
import DashboardHeading from "@/components/common/DashboardHeading";
import { DataTable } from "@/components/ui/data-table";
import { getCollections } from "@/lib/actions/collectionActions";
import { ICollection } from "@/types";
import React from "react";

const CollectionsDashboardPage = async () => {
    const collections = await getCollections();
    return (
        <div>
            <DashboardHeading
                heading="Collections"
                buttonText="Create collection"
                href="/dashboard/collections/create"
            />
            <div className="py-10">
                <DataTable
                    columns={collectionColumns as ICollection[]}
                    data={collections || []}
                />
            </div>
        </div>
    );
};

export default CollectionsDashboardPage;

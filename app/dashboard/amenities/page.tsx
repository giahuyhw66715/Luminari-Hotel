import DashboardHeading from "@/components/common/DashboardHeading";
import { getAmenities } from "@/lib/actions/amenityActions";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { amenityColumns } from "@/components/columns/amenity-columns";

const AmenitiesDashboardPage = async () => {
    const amenities = await getAmenities();

    return (
        <div>
            <DashboardHeading
                heading="Amenities"
                buttonText="Create amenity"
                href="/dashboard/amenities/create"
            />
            <div className="py-10">
                <DataTable columns={amenityColumns} data={amenities || []} />
            </div>
        </div>
    );
};

export default AmenitiesDashboardPage;

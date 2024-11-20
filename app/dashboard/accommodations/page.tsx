import { accommodationColumns } from "@/components/columns/accommodation-columns";
import DashboardHeading from "@/components/common/DashboardHeading";
import { DataTable } from "@/components/ui/data-table";
import { getAccommodations } from "@/lib/actions/accommodationActions";
import { IAccommodation } from "@/types";
import React from "react";

const AccommodationsDashboardPage = async () => {
    const accommodations = await getAccommodations();
    return (
        <div>
            <DashboardHeading
                heading="Accommodations"
                buttonText="Create accommodation"
                href="/dashboard/accommodations/create"
            />
            <div className="py-10">
                <DataTable
                    columns={accommodationColumns as IAccommodation[]}
                    data={accommodations || []}
                />
            </div>
        </div>
    );
};

export default AccommodationsDashboardPage;

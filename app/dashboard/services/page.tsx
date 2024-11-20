import { serviceColumns } from "@/components/columns/service-columns";
import DashboardHeading from "@/components/common/DashboardHeading";
import { DataTable } from "@/components/ui/data-table";
import { getServices } from "@/lib/actions/serviceActions";
import { IService } from "@/types";
import React from "react";

const ServicesDashboardPage = async () => {
    const services = await getServices();
    return (
        <div>
            <DashboardHeading
                heading="Services"
                buttonText="Create service"
                href="/dashboard/services/create"
            />
            <div className="py-10">
                <DataTable
                    columns={serviceColumns as IService[]}
                    data={services || []}
                />
            </div>
        </div>
    );
};

export default ServicesDashboardPage;

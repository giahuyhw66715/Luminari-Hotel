import ServiceForm from "@/components/form/ServiceForm";
import Heading from "@/components/common/Heading";
import { getUniqueService } from "@/lib/actions/serviceActions";
import { IService } from "@/types";
import React from "react";

const EditAccommodationDashboard = async ({
    params,
}: {
    params: { id: string };
}) => {
    const service = await getUniqueService({ id: params.id });

    return (
        <div>
            <Heading underline={false} className="mx-0">
                New Accommodation
            </Heading>
            <ServiceForm service={service as IService} />
        </div>
    );
};

export default EditAccommodationDashboard;

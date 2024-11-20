import ServiceForm from "@/components/form/ServiceForm";
import Heading from "@/components/common/Heading";
import React from "react";

const CreateServiceDashboard = async () => {
    return (
        <div>
            <Heading underline={false} className="mx-0">
                New Service
            </Heading>
            <ServiceForm />
        </div>
    );
};

export default CreateServiceDashboard;

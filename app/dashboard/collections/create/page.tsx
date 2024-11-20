import CollectionForm from "@/components/form/CollectionForm";
import Heading from "@/components/common/Heading";
import React from "react";

const CreateCollectionDashboard = async () => {
    return (
        <div>
            <Heading underline={false} className="mx-0">
                New Collection
            </Heading>
            <CollectionForm />
        </div>
    );
};

export default CreateCollectionDashboard;

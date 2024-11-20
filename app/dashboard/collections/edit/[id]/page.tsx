import CollectionForm from "@/components/form/CollectionForm";
import Heading from "@/components/common/Heading";
import { getUniqueCollection } from "@/lib/actions/collectionActions";
import { ICollection } from "@/types";
import React from "react";

const EditCollectionDashboard = async ({
    params,
}: {
    params: { id: string };
}) => {
    const collection = await getUniqueCollection({
        id: params.id,
    });

    return (
        <div>
            <Heading underline={false} className="mx-0">
                Edit Collection
            </Heading>
            <CollectionForm collection={collection as ICollection} />
        </div>
    );
};

export default EditCollectionDashboard;

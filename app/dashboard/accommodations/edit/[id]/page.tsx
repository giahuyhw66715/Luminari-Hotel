import AccommodationForm from "@/components/form/AccommodationForm";
import Heading from "@/components/common/Heading";
import { getAmenities } from "@/lib/actions/amenityActions";
import { IAccommodation } from "@/types";
import React from "react";
import { getUniqueAccommodation } from "@/lib/actions/accommodationActions";

const EditAccommodationDashboard = async ({
    params,
}: {
    params: { id: string };
}) => {
    const accommodation = await getUniqueAccommodation({
        id: params.id,
    });
    const amenities = await getAmenities();

    return (
        <div>
            <Heading underline={false} className="mx-0">
                New Accommodation
            </Heading>
            <AccommodationForm
                amenities={amenities || []}
                accommodation={accommodation as IAccommodation}
            />
        </div>
    );
};

export default EditAccommodationDashboard;

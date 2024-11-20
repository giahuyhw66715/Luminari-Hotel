import AccommodationForm from "@/components/form/AccommodationForm";
import Heading from "@/components/common/Heading";
import { getAmenities } from "@/lib/actions/amenityActions";
import React from "react";

const CreateAccommodationDashboard = async () => {
    const amenities = await getAmenities();
    return (
        <div>
            <Heading underline={false} className="mx-0">
                New Accommodation
            </Heading>
            <AccommodationForm amenities={amenities || []} />
        </div>
    );
};

export default CreateAccommodationDashboard;

import React from "react";
import DiscoverCarousel from "../DiscoverCarousel";
import Heading from "../common/Heading";
import { getAccommodations } from "@/lib/actions/accommodationActions";
import { IAccommodation } from "@/types";

const HomeAccommodation = async () => {
    const accommodations = await getAccommodations();
    return (
        <div className="mt-20">
            <Heading>Accommodation</Heading>
            <DiscoverCarousel
                initialHref="/accommodations"
                items={accommodations as IAccommodation[]}
            />
        </div>
    );
};

export default HomeAccommodation;

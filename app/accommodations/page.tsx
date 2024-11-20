import AccommodationFilter from "@/components/AccommodationFilter";
import Banner from "@/components/common/Banner";
import AccommodationCard from "@/components/card/AccommodationCard";
import {
    getAccommodations,
    getTotalAccommodations,
} from "@/lib/actions/accommodationActions";
import { IAccommodation } from "@/types";
import React from "react";
import Heading from "@/components/common/Heading";
import AccommodationPagination from "@/components/AccommodationPagination";

type TSearchParams = {
    classification?: string;
    view?: string;
    price?: string;
    sortBy?: string;
    page?: string;
    limit?: string;
};

const AccommodationPage = async ({
    searchParams,
}: {
    searchParams: TSearchParams;
}) => {
    const { classification, view, price, sortBy, page, limit } = searchParams;
    const filter = {
        classification: classification || undefined,
        view: view || undefined,
        price: price || undefined,
        sortBy: sortBy || "PRICE_ASC",
        page: page || "1",
        limit: limit || "4",
    };
    const accommodations = await getAccommodations(filter);
    const total = await getTotalAccommodations(filter);
    if (!accommodations) {
        return (
            <div>
                <Banner
                    title="Accommodations"
                    image="/accommodation-banner.jpg"
                />
                <div className="py-16 container">
                    <Heading underline={false} className="mt-20 mb-0">
                        No accommodations found
                    </Heading>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Banner title="Accommodations" image="/accommodation-banner.jpg" />
            <div className="py-16 container">
                <AccommodationFilter />
                {accommodations?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                            {accommodations?.map((accommodation) => (
                                <AccommodationCard
                                    key={accommodation.id}
                                    accommodation={
                                        accommodation as IAccommodation
                                    }
                                />
                            ))}
                        </div>
                        <AccommodationPagination total={total || 0} />
                    </>
                ) : (
                    <Heading underline={false} className="mt-20 mb-0">
                        No accommodations found
                    </Heading>
                )}
            </div>
        </div>
    );
};

export default AccommodationPage;

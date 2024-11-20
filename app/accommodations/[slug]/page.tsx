import Banner from "@/components/common/Banner";
import CompanyHeading from "@/components/common/CompanyHeading";
import Heading from "@/components/common/Heading";
import {
    getUniqueAccommodation,
    getDiscoverAccommodations,
} from "@/lib/actions/accommodationActions";
import { IAccommodation } from "@/types";
import React from "react";
import parse from "html-react-parser";
import DiscoverCarousel from "@/components/DiscoverCarousel";
import ImagePagination from "@/components/common/ImagePagination";
import { notFound } from "next/navigation";
import { Eye, Scaling, UserRound } from "lucide-react";
import removeUnderScore from "@/utils/removeUnderScore";
import AddToCartButton from "@/components/AddToCartButton";

const AccommodationDetailPage = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const accommodation = (await getUniqueAccommodation({
        slug: params.slug,
    })) as IAccommodation;
    const discoverAccommodations = (await getDiscoverAccommodations(
        params.slug
    )) as IAccommodation[];

    if (!accommodation) {
        return notFound();
    }

    return (
        <div>
            <Banner
                title={accommodation?.title}
                fullHeight
                image={accommodation.images[0]}
            />
            <div className="container py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 space-between items-center gap-5">
                    <div className="lg:max-w-[80%]">
                        <CompanyHeading className="text-left" />
                        <Heading
                            underline={false}
                            className="mx-0 mt-2 text-4xl text-foreground text-left"
                        >
                            {accommodation?.title}
                        </Heading>
                        <p className="leading-relaxed mb-5">
                            {accommodation?.description}
                        </p>
                        <AddToCartButton accommodation={accommodation} />
                    </div>
                    <ImagePagination images={accommodation?.images} />
                </div>
                <div className="mt-20">
                    <Heading>Amenities</Heading>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:max-w-[70%] pt-5 lg:mx-auto">
                        <AmenityDisplayColumns
                            name={`${accommodation.occupancy}`}
                            icon={<UserRound />}
                        />
                        <AmenityDisplayColumns
                            name={removeUnderScore(accommodation.view)}
                            icon={<Eye />}
                        />
                        <AmenityDisplayColumns
                            name={`${accommodation.roomSize} sqm`}
                            icon={<Scaling />}
                        />

                        {accommodation?.amenities?.map((amenity) => (
                            <AmenityDisplayColumns
                                key={amenity.id}
                                name={amenity.name}
                                icon={parse(amenity.icon)}
                            />
                        ))}
                    </div>
                </div>
                {discoverAccommodations.length > 0 && (
                    <div className="mt-20">
                        <Heading>Discover</Heading>
                        <DiscoverCarousel
                            initialHref="/accommodations"
                            items={discoverAccommodations}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const AmenityDisplayColumns = ({
    name,
    icon,
}: {
    name: string;
    icon: React.ReactNode;
}) => {
    return (
        <div className="flex items-center gap-2">
            {icon}
            <span className="capitalize">{name.toLowerCase()}</span>
        </div>
    );
};

export default AccommodationDetailPage;

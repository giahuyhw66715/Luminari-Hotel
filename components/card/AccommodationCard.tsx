import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Heading from "../common/Heading";
import Navigation from "../common/Navigation";
import { IAccommodation } from "@/types";
import removeUnderScore from "@/utils/removeUnderScore";
import ImagePagination from "../common/ImagePagination";
import AddToCartButton from "../AddToCartButton";

const AccommodationCard = ({
    accommodation,
}: {
    accommodation: IAccommodation;
}) => {
    const accommodationDetailUrl = `/accommodations/${accommodation.slug}`;

    return (
        <div>
            <ImagePagination
                images={accommodation.images}
                href={accommodationDetailUrl}
            />
            <Card className="w-full lg:w-4/5 mx-auto -mt-20 z-10 relative">
                <CardHeader className="pb-2">
                    <Link href={accommodationDetailUrl}>
                        <Heading
                            underline={false}
                            className="text-foreground text-xl m-0"
                        >
                            {accommodation.title}
                        </Heading>
                    </Link>
                </CardHeader>
                <CardContent className="pb-3">
                    <p className="line-clamp-2 leading-relaxed mb-3">
                        {accommodation.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                        <AccommodationInfo
                            title="Classification"
                            content={accommodation.classification}
                        />
                        <AccommodationInfo
                            title="Price per night"
                            content={`$${accommodation.price}`}
                        />
                        <AccommodationInfo
                            title="View"
                            content={removeUnderScore(accommodation.view)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <AddToCartButton accommodation={accommodation} />
                    <Navigation
                        href={accommodationDetailUrl}
                        className="hover-underline"
                    >
                        Learn more
                    </Navigation>
                </CardFooter>
            </Card>
        </div>
    );
};

const AccommodationInfo = ({
    title,
    content,
}: {
    title: string;
    content: string;
}) => {
    return (
        <div className="flex flex-col items-center text-sm leading-relaxed">
            <strong className="text-primary">{title}</strong>
            <span className="capitalize">{content.toLowerCase()}</span>
        </div>
    );
};

export default AccommodationCard;

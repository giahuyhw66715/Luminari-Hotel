import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Heading from "../common/Heading";
import { IService } from "@/types";
import ImagePagination from "../common/ImagePagination";
import { Clock, MapPin } from "lucide-react";
import slugify from "@/utils/slugify";
import ServiceInfoItem from "../common/ServiceInfoItem";

const ServiceCard = ({ service }: { service: IService }) => {
    const serviceDetailUrl = `/services/${slugify(service.type)}/${
        service.slug
    }`;

    return (
        <div>
            <ImagePagination images={service.images} href={serviceDetailUrl} />
            <Card className="w-full lg:w-11/12 mx-auto -mt-20 z-10 relative">
                <CardHeader className="pb-2">
                    <Link href={serviceDetailUrl}>
                        <Heading
                            underline={false}
                            className="text-foreground text-xl m-0"
                        >
                            {service.title}
                        </Heading>
                    </Link>
                </CardHeader>
                <CardContent className="pb-3">
                    <p className="line-clamp-2 leading-relaxed mb-3">
                        {service.description}
                    </p>
                </CardContent>
                <CardFooter className="flex items-start gap-y-3 flex-col">
                    <ServiceInfoItem
                        icon={<Clock className="w-4 h-4" />}
                        text={service.openingHours}
                    />
                    <ServiceInfoItem
                        icon={<MapPin className="w-4 h-4" />}
                        text={service.location}
                    />
                </CardFooter>
            </Card>
        </div>
    );
};

export default ServiceCard;

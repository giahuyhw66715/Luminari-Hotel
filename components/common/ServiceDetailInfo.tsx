import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Heading from "./Heading";
import ImagePagination from "./ImagePagination";
import { IService } from "@/types";
import ServiceInfoItem from "./ServiceInfoItem";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const ServiceDetailInfo = ({ service }: { service: IService }) => {
    return (
        <div className={`grid grid-cols-1 lg:grid-cols-[40%_60%] items-center`}>
            <ImagePagination
                images={service.images}
                imageClassName="h-[350px] lg:h-[500px]"
            />
            <Card
                className={`w-11/12 mx-auto -mt-20 z-10 relative lg:w-full lg:mt-0 lg:order-first lg:ml-auto lg:-mr-28`}
            >
                <CardHeader>
                    <Heading
                        underline={false}
                        className="text-foreground text-xl m-0"
                    >
                        {service.title}
                    </Heading>
                </CardHeader>
                <CardContent className="flex items-start gap-y-3 flex-col">
                    <ServiceInfoItem
                        icon={<Clock className="w-4 h-4" />}
                        text={service.openingHours}
                    />
                    <ServiceInfoItem
                        icon={<MapPin className="w-4 h-4" />}
                        text={service.location}
                    />
                    <ServiceInfoItem
                        icon={<Phone className="w-4 h-4" />}
                        text={service.phone}
                    />
                    <ServiceInfoItem
                        icon={<Mail className="w-4 h-4" />}
                        text={service.email}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default ServiceDetailInfo;

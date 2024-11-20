import Banner from "@/components/common/Banner";
import DiscoverCarousel from "@/components/DiscoverCarousel";
import Heading from "@/components/common/Heading";
import ServiceDetailInfo from "@/components/ServiceDetailInfo";
import {
    getDiscoverServices,
    getUniqueService,
} from "@/lib/actions/serviceActions";
import { EServiceType, IService } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

const ServicePage = async ({
    params: { slug },
}: {
    params: { slug: string };
}) => {
    const service = await getUniqueService({ slug });

    if (!service) return notFound();
    const discoverServices = await getDiscoverServices(
        service.id,
        service.type as EServiceType
    );
    return (
        <div>
            <Banner
                title={service?.title}
                fullHeight
                image={service?.images[0]}
            />
            <div className="container py-20">
                <Heading>{service?.title}</Heading>
                <div className="text-center">{service?.description}</div>
                <div className="mt-20">
                    <ServiceDetailInfo service={service as IService} />
                </div>
                <div className="mt-20">
                    <Heading>Discover</Heading>
                    <DiscoverCarousel
                        initialHref="/services"
                        items={discoverServices as IService[]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ServicePage;

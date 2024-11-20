import Banner from "@/components/common/Banner";
import ServiceCard from "@/components/card/ServiceCard";
import { getServices } from "@/lib/actions/serviceActions";
import { EServiceType, IService } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

const DiningPage = async ({ params }: { params: { type: string } }) => {
    const type = params.type.toUpperCase();

    const banner: { title?: string; image?: string } = {};

    if (type.toUpperCase() === EServiceType.DINE) {
        banner.title = "Dining & Nightlife";
        banner.image = "/dine-and-nightlife-banner.jpg";
    } else if (type.toUpperCase() === EServiceType.EVENTS) {
        banner.title = "Events";
        banner.image = "/events-banner.jpg";
    } else if (type.toUpperCase() === EServiceType.FACILITIES) {
        banner.title = "Facilities";
        banner.image = "/facilities-banner.jpg";
    } else {
        return notFound();
    }

    const services = await getServices({ type: type as EServiceType });

    return (
        <div>
            <Banner title={banner.title} image={banner.image} />
            <div className="container py-20">
                <p className="text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi sequi eveniet id consectetur esse modi fugiat
                    molestiae quisquam repellat saepe, distinctio mollitia
                    doloremque ullam sunt hic optio accusantium laborum numquam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur quo adipisci, ipsa repellendus ullam quos
                    aliquam id quaerat distinctio animi libero consequuntur
                    eligendi minima tenetur, nemo ipsam qui a. Adipisci.
                </p>
                <div className="grid lg:grid-cols-2 gap-10 mt-10">
                    {services?.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service as IService}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiningPage;

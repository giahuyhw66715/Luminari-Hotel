import React from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import Navigation from "../common/Navigation";
import { EServiceType, IService } from "@/types";
import { getServices } from "@/lib/actions/serviceActions";
import Link from "next/link";

const HomeEvent = async () => {
    const events = await getServices({ type: EServiceType.EVENTS, take: 2 });

    return (
        <div className="py-20">
            <Heading>Metting & Events</Heading>
            {events?.map((event, index) => (
                <HomeEventItem
                    key={event.id}
                    rightImage={index % 2 !== 0}
                    event={event as IService}
                />
            ))}
        </div>
    );
};

const HomeEventItem = ({
    rightImage = false,
    event,
}: {
    rightImage?: boolean;
    event: IService;
}) => {
    return (
        <div className="grid md:grid-cols-2 gap-10 py-5 md:pb-0">
            <Link
                href={`services/events/${event.slug}`}
                className={`${rightImage && "lg:order-last"}`}
            >
                <Image
                    src={event.images[0]}
                    alt="event"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={`w-full h-[400px] rounded-xl object-cover`}
                    priority
                />
            </Link>
            <div className="lg:py-10">
                <Heading
                    underline={false}
                    className="mx-0 text-left lg:text-center"
                >
                    {event.title}
                </Heading>
                <p className="leading-relaxed mb-5">{event.description}</p>
                <Navigation
                    href={`services/events/${event.slug}`}
                    className="text-sm hover-underline text-secondary"
                >
                    Learn more
                </Navigation>
            </div>
        </div>
    );
};

export default HomeEvent;

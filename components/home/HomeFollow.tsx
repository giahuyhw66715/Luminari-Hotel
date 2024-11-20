import React from "react";
import Heading from "../common/Heading";
import Link from "next/link";
import { v4 } from "uuid";
import FacebookIcon from "../icon/FacebookIcon";
import TwitterIcon from "../icon/TwitterIcon";
import YoutubeIcon from "../icon/YoutubeIcon";
import InstagramIcon from "../icon/InstagramIcon";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { getUniqueCollection } from "@/lib/actions/collectionActions";

const followLinks = [
    {
        link: "https://www.instagram.com/",
        children: "#LuminariHotel",
    },
    {
        link: "https://www.instagram.com/",
        children: <InstagramIcon />,
    },
    {
        link: "https://www.youtube.com/",
        children: <YoutubeIcon />,
    },
    {
        link: "https://www.facebook.com/",
        children: <FacebookIcon />,
    },
    {
        link: "https://www.twitter.com/",
        children: <TwitterIcon />,
    },
];

const HomeFollow = async () => {
    const followCollections = await getUniqueCollection({
        slug: "follow-us",
    });

    return (
        <div className="pt-5 pb-12 my-5 bg-[#e6ddcb] container">
            <Heading className="mb-3 text-base mx-0" underline={false}>
                FOLLOW US
            </Heading>
            <div className="flex items-center gap-3 my-6">
                {followLinks.map((link) => (
                    <Link
                        key={v4()}
                        className="md:text-sm uppercase"
                        href={link.link}
                    >
                        {link.children}
                    </Link>
                ))}
            </div>
            <Carousel opts={{ loop: true }} className="cursor-pointer">
                <CarouselContent>
                    {followCollections?.images.map((image) => (
                        <CarouselItem key={v4()} className="lg:basis-1/3">
                            <Image
                                src={image}
                                alt={"Follow image"}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-[250px] object-cover rounded-xl"
                                priority
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default HomeFollow;

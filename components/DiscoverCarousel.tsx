"use client";
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { IAccommodation, IService } from "@/types";
import { useRouter } from "next/navigation";
import Navigation from "./common/Navigation";

const DiscoverCarousel = ({
    items,
    initialHref = "",
}: {
    items: IAccommodation[] | IService[];
    initialHref: string;
}) => {
    const router = useRouter();
    if (!items) return null;
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent className="items-center">
                {items.map((item) => (
                    <CarouselItem
                        key={item.id}
                        className="md:basis-1/2 lg:basis-1/3 cursor-pointer"
                        onClick={() =>
                            router.push(`${initialHref}/${item.slug}`)
                        }
                    >
                        <div className="relative group overflow-hidden rounded-xl">
                            <Image
                                src={item.images[0]}
                                alt="Image"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-[450px] rounded-xl object-cover group-hover:scale-110 transition-transform duration-300 ease-linear"
                                priority
                            />
                            <div className="absolute -bottom-20 left-0 right-0 text-white z-10 bg-gradient-to-b from-transparent to-black/70 px-6 pt-[25%] pb-14 group-hover:-translate-y-12 transition-transform duration-300 ease-linear">
                                <h4 className="text-3xl font-semibold mb-4 line-clamp-1">
                                    {item.title}
                                </h4>
                                <Navigation
                                    href={item.slug}
                                    className="hover-underline hover:text-secondary"
                                >
                                    Learn more
                                </Navigation>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default DiscoverCarousel;

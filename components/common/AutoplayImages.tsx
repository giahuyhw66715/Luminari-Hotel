"use client";
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { v4 } from "uuid";
import { twMerge } from "tailwind-merge";

const AutoplayImages = ({
    images,
    className = "h-screen",
}: {
    images: string[];
    className?: string;
}) => {
    return (
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem key={v4()}>
                        <Image
                            src={image}
                            alt="Image Carousel"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={twMerge(
                                "w-full object-cover cursor-pointer",
                                className
                            )}
                            priority
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default AutoplayImages;

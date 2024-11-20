"use client";
import React from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import Image from "next/image";
import { v4 } from "uuid";
import Fade from "embla-carousel-fade";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const ImagePagination = ({
    images,
    href = "",
    imageClassName,
}: {
    images: string[];
    href?: string;
    imageClassName?: string;
}) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const router = useRouter();

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <Carousel
            setApi={setApi}
            className="relative"
            opts={{ loop: true }}
            plugins={[Fade()]}
        >
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem key={v4()}>
                        <Image
                            src={image}
                            alt="Image"
                            onClick={() => href && router.push(href)}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={twMerge(
                                "w-full h-[250px] lg:h-[400px] rounded-xl object-cover cursor-pointer",
                                imageClassName
                            )}
                            priority
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-y-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`block w-4 h-4 rounded-full cursor-pointer border-[3px] ${
                            current === index + 1
                                ? "bg-primary border-white"
                                : "bg-white border-primary"
                        }`}
                    ></span>
                ))}
            </div>
        </Carousel>
    );
};

export default ImagePagination;

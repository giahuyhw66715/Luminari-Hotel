import Image from "next/image";
import React from "react";
import Heading from "./Heading";
import CompanyHeading from "./CompanyHeading";

const Banner = ({
    fullHeight = false,
    title,
    image,
}: {
    fullHeight?: boolean;
    title: string;
    image: string;
}) => {
    return (
        <div className="relative">
            <Image
                src={image}
                alt="banner"
                width={0}
                height={0}
                sizes="100vw"
                className={`w-full ${
                    fullHeight ? "h-[80vh] lg:h-screen" : "h-[80vh]"
                } object-cover`}
                priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
                <CompanyHeading className="text-base" />
                <Heading
                    underline={false}
                    className="mt-4 text-2xl lg:text-4xl tracking-wide text-white"
                >
                    {title}
                </Heading>
            </div>
        </div>
    );
};

export default Banner;

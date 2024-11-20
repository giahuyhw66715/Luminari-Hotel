import CompanyHeading from "@/components/common/CompanyHeading";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import React from "react";

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-[80vh]">
            <Image
                src="/404-not-found.svg"
                alt="404"
                width={0}
                height={0}
                sizes="100vw"
                className="w-4/5 h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
                <CompanyHeading className="text-base" />
                <Heading
                    underline={false}
                    className="mt-4 text-4xl tracking-wide text-white"
                >
                    Oops! Something went wrong
                </Heading>
            </div>
        </div>
    );
};

export default NotFoundPage;

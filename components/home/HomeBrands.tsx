import React from "react";
import { v4 } from "uuid";
import Heading from "../common/Heading";
import Image from "next/image";
import CompanyHeading from "../common/CompanyHeading";
import { getUniqueCollection } from "@/lib/actions/collectionActions";

const HomeBrands = async () => {
    const brandCollection = await getUniqueCollection({ slug: "our-brands" });
    return (
        <div className="grid md:grid-cols-2 justify-between gap-10 md:gap-0 py-32">
            <div className="md:w-2/3 w-full">
                <CompanyHeading className="text-left" />
                <Heading underline={false} className="text-4xl mx-0 mt-1.5">
                    {brandCollection?.title}
                </Heading>
                <p className="leading-relaxed">
                    {brandCollection?.description}
                </p>
            </div>
            <div className="grid grid-cols-3 gap-5 justify-center items-center">
                {brandCollection?.images?.map((image) => (
                    <Image
                        key={v4()}
                        src={image}
                        alt="brand"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full max-w-40 object-cover rounded-full"
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeBrands;

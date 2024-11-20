import React from "react";
import Heading from "../common/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/actions/serviceActions";
import { EServiceType } from "@/types";

const HomeExperience = async () => {
    const dineServices = await getServices({
        type: EServiceType.DINE,
        take: 3,
    });

    const facilityServices = await getServices({
        type: EServiceType.FACILITIES,
        take: 3,
    });

    const allServices = [
        JSON.parse(JSON.stringify(dineServices || [])),
        JSON.parse(JSON.stringify(facilityServices || [])),
    ].flat();

    return (
        <div className="mt-20">
            <Heading>Experiences</Heading>
            <Tabs defaultValue={dineServices?.[0]?.id}>
                <TabsList className="flex-wrap">
                    {allServices?.map((item) => (
                        <TabsTrigger key={item.id} value={item.id}>
                            {item.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {allServices?.map((item) => (
                    <TabsContent key={item.id} value={item.id}>
                        <div className="grid grid-cols-4 grid-rows-2 gap-2 md:max-h-[500px]">
                            <div className="md:col-span-2 col-span-full">
                                <Image
                                    src={item.images[0]}
                                    alt="Experience"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-full rounded-xl object-cover"
                                />
                            </div>
                            <div className="col-span-full md:col-start-1 md:row-start-2 md:col-span-1">
                                <Image
                                    src={item.images[1]}
                                    alt="Experience"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-full rounded-xl object-cover"
                                />
                            </div>
                            <div className="col-span-full order-first md:order-none md:col-start-2 md:row-start-2 md:col-span-1 bg-[#e5ddcb] p-4 rounded-xl text-center flex flex-col gap-y-4">
                                <Heading className="text-base mb-0 mt-4 text-secondary">
                                    {item.title}
                                </Heading>
                                <div className="flex flex-col items-center justify-between flex-1">
                                    <p className="line-clamp-3 text-sm">
                                        {item.description}
                                    </p>
                                    <Link
                                        href={`/services/${item.type}/${item.slug}`}
                                        className="hover-underline text-secondary after:bg-current text-sm"
                                    >
                                        Learn more
                                    </Link>
                                </div>
                            </div>
                            <div className="col-span-full md:col-span-2 md:row-span-full md:col-start-3 md:row-start-1">
                                <Image
                                    src={item.images[2]}
                                    alt="Experience"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-full rounded-xl object-cover"
                                />
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default HomeExperience;

import React from "react";
import Heading from "./Heading";
import { Button } from "../ui/button";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

const DashboardHeading = ({
    heading,
    buttonText,
    href,
}: {
    heading: string;
    buttonText: string;
    href: string;
}) => {
    return (
        <div className="flex items-end justify-between gap-x-5">
            <Heading className="m-0" underline={false}>
                {heading}
            </Heading>
            <Link href={href}>
                <Button className="py-6 capitalize flex items-center gap-1">
                    {buttonText}
                    <CirclePlus className="w-4 h-4" />
                </Button>
            </Link>
        </div>
    );
};

export default DashboardHeading;

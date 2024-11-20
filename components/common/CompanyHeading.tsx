import React from "react";
import { twMerge } from "tailwind-merge";

const CompanyHeading = ({
    className,
    text = "Luminari Hotel",
}: {
    className?: string;
    text?: string;
}) => {
    return (
        <span
            className={twMerge(
                "block text-secondary text-sm font-semibold text-center uppercase",
                className
            )}
        >
            {text}
        </span>
    );
};

export default CompanyHeading;

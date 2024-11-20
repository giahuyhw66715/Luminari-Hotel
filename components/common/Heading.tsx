import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    underline?: boolean;
    className?: string;
    children: React.ReactNode;
};
const Heading = ({ underline = true, className, children }: Props) => {
    return (
        <h4
            className={twMerge(
                `text-2xl text-center my-6 w-fit mx-auto uppercase text-primary font-semibold ${
                    underline &&
                    "after:contents[''] after:block after:w-1/2 after:max-w-20 after:bg-primary after:h-0.5 after:mx-auto after:mt-3 after:mb-4"
                }`,
                className
            )}
        >
            {children}
        </h4>
    );
};

export default Heading;

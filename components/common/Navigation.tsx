import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

const Navigation = ({
    href,
    children,
    className = "",
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <Link
            href={href}
            className={twMerge(
                `hover:text-primary transition-all duration-200 ease-in`,
                className
            )}
        >
            {children}
        </Link>
    );
};

export default Navigation;

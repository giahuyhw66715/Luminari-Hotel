"use client";
import React from "react";
import {
    CalendarCheck,
    HandHeart,
    HandPlatter,
    HotelIcon,
    Library,
} from "lucide-react";
import { v4 } from "uuid";
import { usePathname } from "next/navigation";
import Link from "next/link";

const adminNavigationList = [
    {
        label: "Accommodations",
        href: "/dashboard/accommodations",
        icon: <HotelIcon />,
    },
    {
        label: "Amenities",
        href: "/dashboard/amenities",
        icon: <HandHeart />,
    },
    {
        label: "Bookings",
        href: "/dashboard/bookings",
        icon: <CalendarCheck />,
    },
    {
        label: "Collections",
        href: "/dashboard/collections",
        icon: <Library />,
    },
    {
        label: "Services",
        href: "/dashboard/services",
        icon: <HandPlatter />,
    },
];

const AdminNavigation = () => {
    const pathName = usePathname();

    return (
        <>
            {adminNavigationList.map((item) => (
                <Link
                    key={v4()}
                    href={item.href}
                    className={`flex items-center gap-3 mb-3 px-4 py-2 rounded-lg w-full hover:bg-primary hover:text-white transition-all ${
                        pathName.includes(item.href) && "bg-primary text-white"
                    }`}
                >
                    {item.icon}
                    {item.label}
                </Link>
            ))}
        </>
    );
};

export default AdminNavigation;

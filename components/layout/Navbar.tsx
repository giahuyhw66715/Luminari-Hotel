"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "../common/Navigation";
import NavbarMenuMobile from "../NavbarMenuMobile";
import CustomUserButton from "../CustomUserButton";
import { v4 } from "uuid";

export const navLinkList = [
    {
        name: "Accommodations",
        href: "/accommodations",
    },
    {
        name: "Dine & Nightlife",
        href: "/services/dine",
    },
    {
        name: "Events",
        href: "/services/events",
    },
    {
        name: "Facilities",
        href: "/services/facilities",
    },
    {
        name: "Cart",
        href: "/cart",
    },
];

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-lg py-5">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <Image
                        src="/logo-dark.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        priority
                        className="object-cover"
                    ></Image>
                </Link>
                <div className="lg:flex items-center gap-x-5 font-medium hidden">
                    {navLinkList.map((link) => (
                        <Navigation key={v4()} href={link.href}>
                            {link.name}
                        </Navigation>
                    ))}
                    <CustomUserButton />
                </div>
                <NavbarMenuMobile />
            </div>
        </header>
    );
};

export default Navbar;

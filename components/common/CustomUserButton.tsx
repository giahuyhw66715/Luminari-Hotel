"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { CalendarCheck, LayoutDashboard } from "lucide-react";

const CustomUserButton = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const isAdmin =
        isLoaded && isSignedIn && user?.publicMetadata?.role === "admin";

    return (
        <>
            {user ? (
                <UserButton>
                    <UserButton.MenuItems>
                        {isAdmin && (
                            <UserButton.Link
                                label="Dashboard"
                                labelIcon={
                                    <LayoutDashboard className="w-4 h-4" />
                                }
                                href="/dashboard"
                            />
                        )}
                        <UserButton.Link
                            label="Booking"
                            labelIcon={<CalendarCheck className="w-4 h-4" />}
                            href="/booking"
                        />
                    </UserButton.MenuItems>
                </UserButton>
            ) : (
                <Link
                    href="/sign-in"
                    className={buttonVariants({ variant: "default" })}
                >
                    Sign in
                </Link>
            )}
        </>
    );
};

export default CustomUserButton;

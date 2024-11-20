import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";

import { Menu } from "lucide-react";
import Navigation from "./common/Navigation";
import CustomUserButton from "./CustomUserButton";
import { navLinkList } from "./layout/Navbar";
import { v4 } from "uuid";

const NavbarMenuMobile = () => {
    return (
        <Drawer>
            <DrawerTrigger className="lg:hidden">
                <Menu className="h-6 w-6" />
            </DrawerTrigger>
            <DrawerContent className="text-center">
                <DrawerHeader className="items-center">
                    <DrawerTitle className="text-center text-2xl">
                        Welcome to Luminari Hotel
                    </DrawerTitle>
                    <DrawerDescription className="text-center">
                        Luminous Luxury, Unforgettable Experience
                    </DrawerDescription>
                    <div className="flex flex-col items-center gap-y-3 mt-5 font-medium">
                        {navLinkList.map((link) => (
                            <Navigation key={v4()} href={link.href}>
                                <DrawerClose>{link.name}</DrawerClose>
                            </Navigation>
                        ))}
                    </div>
                </DrawerHeader>
                <DrawerFooter className="mx-auto">
                    <CustomUserButton />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default NavbarMenuMobile;

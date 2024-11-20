import AdminNavigation from "@/components/AdminNavigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Luminari Hotel | Dashboard",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="py-40 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-20 items-start container">
            <div className="bg-white shadow-md rounded-xl py-5 px-3 border border-divider">
                <Link href="/">
                    <Image
                        src="/logo-dark.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="mb-10 mx-auto object-cover"
                        priority
                    />
                </Link>
                <AdminNavigation />
            </div>
            {children}
        </div>
    );
}

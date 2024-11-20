import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Luminari Hotel",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`antialiased`}>
                    <div className="flex flex-col min-h-screen ">
                        <Navbar />
                        <div className="flex-1">{children}</div>
                        <Footer />
                    </div>
                    <Toaster position="bottom-center" duration={2000} />
                </body>
            </html>
        </ClerkProvider>
    );
}

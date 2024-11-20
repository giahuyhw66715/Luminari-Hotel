"use server";
import { revalidatePath } from "next/cache";
import prisma from "../db";
import { IBooking, ICartItem, PartialBy } from "@/types";

export const createBooking = async (data: PartialBy<IBooking, "id">) => {
    try {
        await prisma.booking.create({
            data: {
                ...data,
                bookingItems: {
                    create: data.bookingItems.map((item: ICartItem) => ({
                        accommodation: {
                            connect: {
                                id: item.accommodation.id,
                            },
                        },
                        quantity: item.quantity,
                        startDate: item.startDate || new Date(),
                        endDate: item.endDate || new Date(),
                    })),
                },
            },
        });
        return {
            success: true,
            message: "Booking created successfully",
        };
    } catch (error) {
        console.log("🚀 ~ error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
        };
    } finally {
        await prisma.$disconnect();
    }
};

export const getBookings = async (customerClerkId?: string) => {
    try {
        return await prisma.booking.findMany({
            where: {
                customerClerkId,
            },
            include: {
                bookingItems: {
                    include: {
                        accommodation: true,
                    },
                },
            },
        });
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

export const deleteBooking = async (id: string) => {
    try {
        await prisma.booking.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/bookings");
        return {
            success: true,
            message: "Booking deleted successfully",
        };
    } catch (error) {
        console.log("🚀 ~ error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
        };
    } finally {
        await prisma.$disconnect();
    }
};

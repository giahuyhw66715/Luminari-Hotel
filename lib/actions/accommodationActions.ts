"use server";

import prisma from "../db";
import slugify from "@/utils/slugify";
import { ERoomClassification, EViewType, TInferAccommodation } from "@/types";
import { revalidatePath } from "next/cache";

type TFilter = {
    classification?: string;
    view?: string;
    price?: string;
    sortBy?: string;
    page?: string;
    limit?: string;
};

export const createAccommodation = async (data: TInferAccommodation) => {
    try {
        await prisma.accommodation.create({
            data: {
                ...data,
                slug: slugify(data.title),
                amenities: {
                    connect: data.amenities.map((id) => ({
                        id,
                    })),
                },
            },
        });
        revalidatePath("/dashboard/accommodations/create");
        return {
            success: true,
            message: "Accommodation created successfully",
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

export const getAccommodations = async (filter?: TFilter) => {
    const { classification, view, price, sortBy, page, limit } = filter || {};
    try {
        return await prisma.accommodation.findMany({
            where: {
                classification: {
                    in: classification
                        ? (classification.split(",") as ERoomClassification[])
                        : undefined,
                },
                view: {
                    in: view ? (view.split(",") as EViewType[]) : undefined,
                },
                price: {
                    gte: price ? Number(price.split("-")[0]) : 0,
                    lte: price ? Number(price.split("-")[1]) : 10000,
                },
            },
            orderBy: {
                price: sortBy === "PRICE_ASC" ? "asc" : "desc",
            },
            take: Number(limit) || 100,
            skip: (Number(page) - 1) * Number(limit) || 0,
            include: {
                amenities: true,
            },
        });
    } catch (error) {
        console.log("🚀 ~ error:", error);
        return;
    } finally {
        await prisma.$disconnect();
    }
};

export const getUniqueAccommodation = async ({
    id,
    slug,
}: {
    id?: string;
    slug?: string;
}) => {
    try {
        return await prisma.accommodation.findUnique({
            where: {
                id,
                slug,
            },
            include: {
                amenities: true,
            },
        });
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

export const getTotalAccommodations = async (filter?: TFilter) => {
    const { classification, view, price, sortBy } = filter || {};
    try {
        return await prisma.accommodation.count({
            where: {
                classification: {
                    in: classification
                        ? (classification.split(",") as ERoomClassification[])
                        : undefined,
                },
                view: {
                    in: view ? (view.split(",") as EViewType[]) : undefined,
                },
                price: {
                    gte: price ? Number(price.split("-")[0]) : 0,
                    lte: price ? Number(price.split("-")[1]) : 10000,
                },
            },
            orderBy: {
                price: sortBy === "PRICE_ASC" ? "asc" : "desc",
            },
        });
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

export const getDiscoverAccommodations = async (slug: string) => {
    try {
        return await prisma.accommodation.findMany({
            where: {
                NOT: {
                    slug,
                },
            },
            take: 6,
        });
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

export const editAccommodation = async (
    id: string,
    data: TInferAccommodation
) => {
    try {
        await prisma.accommodation.update({
            where: {
                id,
            },
            data: {
                ...data,
                slug: slugify(data.title),
                amenities: {
                    connect: data.amenities.map((id) => ({
                        id,
                    })),
                },
            },
        });
        revalidatePath(`/dashboard/accommodations/edit/${id}`);
        return {
            success: true,
            message: "Accommodation updated successfully",
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

export const deleteAccommodation = async (id: string) => {
    try {
        await prisma.bookingItem.deleteMany({
            where: {
                accommodationId: id,
            },
        });
        await prisma.accommodation.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/accommodations");
        return {
            success: true,
            message: "Accommodation deleted successfully",
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

"use server";
import { EServiceType, TInferService } from "@/types";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import slugify from "@/utils/slugify";

type TGetServices = {
    type?: EServiceType;
    take?: number;
    skip?: number;
};

export const createService = async (data: TInferService) => {
    try {
        await prisma.service.create({
            data: {
                ...data,
                slug: slugify(data.title),
            },
        });
        revalidatePath("/dashboard/services/create");
        return {
            success: true,
            message: "Service created successfully",
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

export const getServices = async (filter?: TGetServices) => {
    const { type, take, skip } = filter || {};
    try {
        return await prisma.service.findMany({
            where: {
                type,
            },
            take,
            skip,
        });
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

export const getUniqueService = async ({
    id,
    slug,
}: {
    id?: string;
    slug?: string;
}) => {
    try {
        return await prisma.service.findUnique({
            where: {
                id,
                slug,
            },
        });
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

export const getDiscoverServices = async (id: string, type: EServiceType) => {
    try {
        return await prisma.service.findMany({
            where: {
                type,
                NOT: {
                    id,
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

export const editService = async (id: string, data: TInferService) => {
    try {
        await prisma.service.update({
            where: {
                id,
            },
            data: {
                ...data,
                slug: slugify(data.title),
            },
        });
        revalidatePath(`/dashboard/services/edit/${id}`);
        return {
            success: true,
            message: "Service updated successfully",
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

export const deleteService = async (id: string) => {
    try {
        await prisma.service.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/services");
        return {
            success: true,
            message: "Service deleted successfully",
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

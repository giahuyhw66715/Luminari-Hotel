"use server";
import { TInferCollection } from "@/types";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import slugify from "@/utils/slugify";

export const createCollection = async (data: TInferCollection) => {
    try {
        await prisma.collection.create({
            data: {
                ...data,
                slug: data.slug ? slugify(data.slug) : slugify(data.title),
            },
        });
        revalidatePath("/dashboard/collections/create");
        return {
            success: true,
            message: "Collection created successfully",
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

export const getCollections = async () => {
    try {
        return await prisma.collection.findMany();
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

export const getUniqueCollection = async ({
    id,
    slug,
}: {
    id?: string;
    slug?: string;
}) => {
    try {
        return await prisma.collection.findUnique({
            where: {
                id,
                slug,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const editCollection = async (id: string, data: TInferCollection) => {
    try {
        await prisma.collection.update({
            where: {
                id,
            },
            data: {
                ...data,
                slug: data.slug ? slugify(data.slug) : slugify(data.title),
            },
        });
        revalidatePath(`/dashboard/collections/edit/${id}`);
        return {
            success: true,
            message: "Collection updated successfully",
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

export const deleteCollection = async (id: string) => {
    try {
        await prisma.collection.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/collections");
        return {
            success: true,
            message: "Collection deleted successfully",
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

"use server";
import { IAmenity } from "@/types";
import prisma from "../db";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createAmenity = async (data: IAmenity) => {
    try {
        await prisma.amenity.create({
            data,
        });
        revalidatePath("/dashboard/amenities");
        return {
            success: true,
            message: "Amenity created successfully",
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

export const getAmenities = async () => {
    try {
        return await prisma.amenity.findMany();
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

export const getAmenityById = async (id: string) => {
    try {
        const amenity = await prisma.amenity.findUnique({
            where: {
                id,
            },
        });
        if (!amenity) {
            return notFound();
        }
        return amenity;
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};

export const editAmenity = async (id: string, data: IAmenity) => {
    try {
        await prisma.amenity.update({
            where: {
                id,
            },
            data,
        });
        revalidatePath(`/dashboard/amenities`);
        return {
            success: true,
            message: "Amenity updated successfully",
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

export const deleteAmenity = async (id: string) => {
    try {
        await prisma.amenity.delete({
            where: {
                id,
            },
        });
        revalidatePath(`/dashboard/amenities`);
        return {
            success: true,
            message: "Amenity deleted successfully",
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

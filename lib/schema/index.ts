import { ERoomClassification, EServiceType, EViewType } from "@/types";
import { z } from "zod";

export const amenitySchema = z.object({
    name: z.string().min(1, {
        message: "Please enter an amenity.",
    }),
    icon: z
        .string()
        .min(1, {
            message: "Please enter an icon.",
        })
        .refine((value) => value.startsWith("<svg"), {
            message: "Please enter a valid svg icon.",
        }),
});

export const accommodationSchema = z.object({
    title: z.string().min(1, {
        message: "Please enter a title.",
    }),
    description: z.string().min(1, {
        message: "Please enter a description.",
    }),
    price: z.coerce
        .number({
            invalid_type_error: "Please enter a price in number.",
        })
        .min(0, {
            message: "Price cannot be negative.",
        }),
    images: z.array(z.string()).refine((value) => value.length > 0, {
        message: "Please upload at least one image.",
    }),
    amenities: z.array(z.string()).refine((value) => value.length > 0, {
        message: "Please select at least one amenity.",
    }),
    bed: z
        .string({
            required_error: "Please enter a bed.",
        })
        .min(1, {
            message: "Please enter a bed.",
        }),
    classification: z.enum(
        [ERoomClassification.STANDARD, ERoomClassification.SUITE],
        {
            required_error: "Please select room classification.",
        }
    ),
    view: z.enum(
        [EViewType.BEACH_VIEW, EViewType.CITY_VIEW, EViewType.GARDEN_VIEW],
        {
            required_error: "Please select room view.",
        }
    ),
    occupancy: z.coerce
        .number({
            invalid_type_error: "Please enter an occupancy in number.",
        })
        .min(0, {
            message: "Occupancy cannot be negative.",
        }),
    roomSize: z.coerce
        .number({
            invalid_type_error: "Please enter a room size in number.",
        })
        .min(0, {
            message: "Room size cannot be negative.",
        }),
});

export const serviceSchema = z.object({
    title: z.string().min(1, {
        message: "Please enter a title.",
    }),
    description: z.string().min(1, {
        message: "Please enter a description.",
    }),
    images: z.array(z.string()).refine((value) => value.length > 0, {
        message: "Please upload at least one image.",
    }),
    type: z.enum(
        [EServiceType.DINE, EServiceType.EVENTS, EServiceType.FACILITIES],
        {
            required_error: "Please select service type.",
        }
    ),
    openingHours: z.string().min(1, {
        message: "Please enter opening hours.",
    }),
    location: z.string().min(1, {
        message: "Please enter a location.",
    }),
    phone: z.string().min(1, {
        message: "Please enter a phone number.",
    }),
    email: z
        .string()
        .min(1, {
            message: "Please enter an email.",
        })
        .email({ message: "Please enter a valid email." }),
});

export const collectionSchema = z.object({
    title: z.string().min(1, {
        message: "Please enter a title.",
    }),
    description: z.string().optional(),
    images: z.array(z.any()),
    slug: z.string().optional(),
});

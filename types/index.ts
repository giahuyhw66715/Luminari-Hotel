import {
    accommodationSchema,
    collectionSchema,
    serviceSchema,
} from "@/lib/schema";
import { z } from "zod";

export type Roles = "admin" | "customer";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles;
        };
    }
}

export enum EServiceType {
    DINE = "DINE",
    EVENTS = "EVENTS",
    FACILITIES = "FACILITIES",
}

export interface IService {
    id: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
    type: EServiceType;
    openingHours: string;
    location: string;
    phone: string;
    email: string;
}

export interface IAmenity {
    id: string;
    name: string;
    icon: string;
}

export enum EViewType {
    BEACH_VIEW = "BEACH_VIEW",
    CITY_VIEW = "CITY_VIEW",
    GARDEN_VIEW = "GARDEN_VIEW",
}

export enum ERoomClassification {
    STANDARD = "STANDARD",
    SUITE = "SUITE",
}

export enum EPaymentMethod {
    CASH = "CASH",
    CARD = "CARD",
}

export interface IAccommodation {
    id: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
    price: number;
    amenities: IAmenity[];
    bed: string;
    classification: ERoomClassification;
    view: EViewType;
    occupancy: number;
    roomSize: number;
}

export interface ICollection {
    id: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
}

export interface ICartItem {
    accommodation: IAccommodation;
    quantity: number;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
}

export interface IBooking {
    id: string;
    customerClerkId: string;
    bookingItems: ICartItem[];
    total: number;
    method: EPaymentMethod;
    createdAt?: Date;
    updatedAt?: Date;
}

export type TInferCollection = z.infer<typeof collectionSchema>;
export type TInferAccommodation = z.infer<typeof accommodationSchema>;
export type TInferService = z.infer<typeof serviceSchema>;

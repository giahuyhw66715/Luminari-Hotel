"use client";
import React from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ERoomClassification, EViewType } from "@/types";
import getArrayFromEnum from "@/utils/getArrayFromEnum";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const priceRanges: { key: string; label: string }[] = [
    {
        key: "200-400",
        label: "$200 - $400",
    },
    {
        key: "400-600",
        label: "$400 - $600",
    },
    {
        key: "600-800",
        label: "$600 - $800",
    },
    {
        key: "800-1000",
        label: "$800 - $1000",
    },
    {
        key: "1000-1200",
        label: "$1000 - $1200",
    },
];

export const sortBy: { key: string; label: string }[] = [
    {
        key: "PRICE_ASC",
        label: "Price: Low to High",
    },
    {
        key: "PRICE_DESC",
        label: "Price: High to Low",
    },
];

function AccommodationFilter() {
    const viewOptions = getArrayFromEnum(EViewType);
    const classificationOptions = getArrayFromEnum(ERoomClassification);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const classification = searchParams.get("classification");
    const view = searchParams.get("view");
    const price = searchParams.get("price");
    const sort = searchParams.get("sortBy");

    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const onSelect = (name: string, value: string) => {
        current.set(name, value);
        router.push(`${pathname}?${current.toString().replace(/%2C/g, ",")}`);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <MultiSelect
                options={classificationOptions}
                onValueChange={(value) =>
                    onSelect("classification", value.join(","))
                }
                defaultValue={classification ? classification.split(",") : []}
                placeholder="Select room classification"
                variant="inverted"
                maxCount={2}
            />
            <MultiSelect
                options={viewOptions}
                onValueChange={(value) => onSelect("view", value.join(","))}
                defaultValue={view ? view.split(",") : []}
                placeholder="Select view"
                variant="inverted"
                maxCount={2}
            />
            <Select
                defaultValue={price ? price : undefined}
                onValueChange={(onValueChange) =>
                    onSelect("price", onValueChange)
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select price" />
                </SelectTrigger>
                <SelectContent>
                    {priceRanges.map((priceRange) => (
                        <SelectItem key={priceRange.key} value={priceRange.key}>
                            {priceRange.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select
                defaultValue={sort ? sort : "PRICE_ASC"}
                onValueChange={(onValueChange) =>
                    onSelect("sortBy", onValueChange)
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    {sortBy.map((sort) => (
                        <SelectItem key={sort.key} value={sort.key}>
                            {sort.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default AccommodationFilter;

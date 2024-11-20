"use client";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

const AccommodationPagination = ({ total }: { total: number }) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "4";
    const router = useRouter();

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const onPaginate = (value: number) => {
        current.set("page", value.toString());
        current.set("limit", limit);
        router.push(`?${current.toString()}`);
    };
    const numberOfPages = Math.ceil(total / Number(limit));

    return (
        <Pagination className="mt-16">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPaginate(+page - 1)}
                        className={`cursor-pointer ${
                            +page === 1 &&
                            "pointer-events-none opacity-50 select-none"
                        }`}
                    />
                </PaginationItem>
                {[...Array(numberOfPages)].map((_, i) => (
                    <PaginationItem
                        key={i + 1}
                        onClick={() => onPaginate(i + 1)}
                    >
                        <PaginationLink
                            className="cursor-pointer"
                            isActive={i + 1 === +page}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPaginate(+page + 1)}
                        className={`cursor-pointer ${
                            numberOfPages === +page &&
                            "pointer-events-none opacity-50 select-none"
                        }`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default AccommodationPagination;

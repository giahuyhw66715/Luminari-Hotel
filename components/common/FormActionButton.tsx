"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const FormActionButton = ({ isPending }: { isPending: boolean }) => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center gap-x-3">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
                Cancel
            </Button>
            <Button disabled={isPending} type="submit">
                {isPending && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isPending ? "Submitting" : "Submit"}
            </Button>
        </div>
    );
};

export default FormActionButton;

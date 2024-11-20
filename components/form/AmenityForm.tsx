"use client";
import { useTransition } from "react";
import FormActionButton from "@/components/common/FormActionButton";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAmenity, editAmenity } from "@/lib/actions/amenityActions";
import { amenitySchema } from "@/lib/schema";
import { IAmenity } from "@/types";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const AmenityForm = ({ amenity }: { amenity?: IAmenity }) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<IAmenity>({
        resolver: zodResolver(amenitySchema),
        defaultValues: {
            name: amenity?.name || "",
            icon: amenity?.icon || "",
        },
    });

    const isEdit = !!amenity;

    const onSubmit = (data: IAmenity) => {
        startTransition(async () => {
            const response = isEdit
                ? await editAmenity(amenity?.id, data)
                : await createAmenity(data);
            if (response.success) {
                if (!isEdit) {
                    form.reset();
                }
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E.g. Free Wifi"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E.g. data://example.com/example.png"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormActionButton isPending={isPending} />
            </form>
        </Form>
    );
};

export default AmenityForm;

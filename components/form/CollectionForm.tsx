"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormActionButton from "../common/FormActionButton";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "../common/ImageUpload";
import { ICollection, TInferCollection } from "@/types";
import { collectionSchema } from "@/lib/schema";
import {
    createCollection,
    editCollection,
} from "@/lib/actions/collectionActions";
type FormProps = {
    collection?: ICollection;
};

const CollectionForm = ({ collection }: FormProps) => {
    const form = useForm<TInferCollection>({
        resolver: zodResolver(collectionSchema),
        defaultValues: {
            title: collection?.title || "",
            slug: collection?.slug || "",
            description: collection?.description || "",
            images: collection?.images || [],
        },
    });
    const [isPending, startTransition] = React.useTransition();
    const isEdit = !!collection;

    const onSubmit = (data: TInferCollection) => {
        startTransition(async () => {
            const response = isEdit
                ? await editCollection(collection?.id, data)
                : await createCollection(data);
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
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E.g. Introduction"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E.g. introduction"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter collection description here"
                                    className="resize-none min-h-20"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    urls={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormActionButton isPending={isPending} />
            </form>
        </Form>
    );
};

export default CollectionForm;

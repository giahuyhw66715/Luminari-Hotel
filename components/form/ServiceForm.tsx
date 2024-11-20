"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { v4 } from "uuid";
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
import { serviceSchema } from "@/lib/schema";
import ImageUpload from "../common/ImageUpload";
import { EServiceType, IService, TInferService } from "@/types";
import getArrayFromEnum from "@/utils/getArrayFromEnum";
import { createService, editService } from "@/lib/actions/serviceActions";

type FormProps = {
    service?: IService;
};

const ServiceForm = ({ service }: FormProps) => {
    const form = useForm<TInferService>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            title: service?.title || "",
            description: service?.description || "",
            images: service?.images || [],
            type: service?.type || EServiceType.DINE,
            openingHours: service?.openingHours || "",
            location: service?.location || "",
            phone: service?.phone || "",
            email: service?.email || "",
        },
    });
    const serviceTypes = getArrayFromEnum(EServiceType);
    const [isPending, startTransition] = React.useTransition();
    const isEdit = !!service;

    const onSubmit = (data: TInferService) => {
        startTransition(async () => {
            const response = isEdit
                ? await editService(service?.id, data)
                : await createService(data);
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
                                        placeholder="E.g. Skybar"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a service type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {serviceTypes.map((service) => (
                                            <SelectItem
                                                key={v4()}
                                                value={service.value}
                                            >
                                                {service.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="openingHours"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Opening Hours</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E.g. 9:00 AM - 23:00 PM"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E.g. Second Floor"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E.g. +1 234 567 890"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E.g. abc@example.com"
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
                                    placeholder="Enter service description here"
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

export default ServiceForm;

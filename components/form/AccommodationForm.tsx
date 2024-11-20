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
import {
    ERoomClassification,
    EViewType,
    IAccommodation,
    IAmenity,
    TInferAccommodation,
} from "@/types";
import getArrayFromEnum from "@/utils/getArrayFromEnum";
import { toast } from "sonner";
import FormActionButton from "../common/FormActionButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { accommodationSchema } from "@/lib/schema";
import ImageUpload from "../common/ImageUpload";
import { MultiSelect } from "../ui/multi-select";
import {
    createAccommodation,
    editAccommodation,
} from "@/lib/actions/accommodationActions";

type FormProps = {
    amenities: IAmenity[];
    accommodation?: IAccommodation;
};

const AccommodationForm = ({ amenities, accommodation }: FormProps) => {
    const form = useForm<TInferAccommodation>({
        resolver: zodResolver(accommodationSchema),
        defaultValues: {
            title: accommodation?.title || "",
            description: accommodation?.description || "",
            price: accommodation?.price || 0,
            images: accommodation?.images || [],
            amenities:
                accommodation?.amenities?.map((amenity) => amenity.id) || [],
            bed: accommodation?.bed || "",
            classification:
                accommodation?.classification || ERoomClassification.STANDARD,
            view: accommodation?.view || EViewType.GARDEN_VIEW,
            occupancy: accommodation?.occupancy || 0,
            roomSize: accommodation?.roomSize || 0,
        },
    });
    const [isPending, startTransition] = React.useTransition();

    const amenityOptions = amenities.map((amenity) => ({
        label: amenity.name,
        value: amenity.id,
    }));

    const views = getArrayFromEnum(EViewType);
    const roomClassifications = getArrayFromEnum(ERoomClassification);
    const isEdit = !!accommodation;

    const onSubmit = (data: TInferAccommodation) => {
        startTransition(async () => {
            const response = isEdit
                ? await editAccommodation(accommodation?.id, data)
                : await createAccommodation(data);
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
                                        placeholder="E.g. Standard Room"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="E.g. 500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="occupancy"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Occupancy</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="E.g. 2"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="roomSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Room size (sqm)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="E.g. 48"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="classification"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Classification</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a room classification" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roomClassifications.map((room) => (
                                            <SelectItem
                                                key={v4()}
                                                value={room.value}
                                            >
                                                {room.label}
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
                        name="view"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>View</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a room view" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {views.map((view) => (
                                            <SelectItem
                                                key={v4()}
                                                value={view.value}
                                            >
                                                {view.label}
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
                        name="bed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bed</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="E.g. 1 King size bed"
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
                    name="amenities"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amenities</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    options={amenityOptions}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    placeholder="Select room amenities"
                                    variant="inverted"
                                    maxCount={10}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter room description here"
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

export default AccommodationForm;

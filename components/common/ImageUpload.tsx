import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { v4 } from "uuid";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

type Props = {
    urls?: string[];
    onChange?: (urls: string[]) => void;
};
const ImageUpload = ({ urls = [], onChange }: Props) => {
    const [images, setImages] = React.useState<string[]>(urls || []);

    React.useEffect(() => {
        onChange?.(images);
    }, [images, onChange]);

    const handleUploadImage = (result: any) => {
        setImages((images) => [...images, result?.info?.secure_url]);
    };

    return (
        <div>
            {urls.length > 0 && (
                <div className="grid grid-cols-4 gap-5 mb-5">
                    {urls.map((url) => (
                        <div key={v4()} className="relative">
                            <Image
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-64 rounded-xl object-cover"
                                src={url}
                                alt="room"
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute right-2 top-2"
                                onClick={() => {
                                    onChange?.(
                                        urls.filter((image) => image !== url)
                                    );
                                }}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <CldUploadWidget
                uploadPreset="s7puq1wm"
                onSuccess={handleUploadImage}
                options={{
                    folder: "Luminari Hotel",
                }}
            >
                {({ open }) => {
                    return (
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                open();
                            }}
                        >
                            Upload an Image
                            <PlusCircle className="ml-2 h-4 w-4" />
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;

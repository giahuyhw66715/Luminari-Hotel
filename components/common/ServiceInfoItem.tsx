import React from "react";

const ServiceInfoItem = ({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) => {
    return (
        <div className="flex items-center gap-x-3">
            {icon}
            <p className="text-sm">{text}</p>
        </div>
    );
};

export default ServiceInfoItem;

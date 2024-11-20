import React from "react";

const ArrowHoverButton = ({
    onClick,
    children,
}: {
    onClick?: () => void;
    children: React.ReactNode;
}) => {
    return (
        <button
            className="relative inline-block w-36 h-auto group"
            onClick={onClick}
        >
            <span className="relative block m-0 w-10 h-10 bg-primary rounded-full transition-all duration-300 ease-in group-hover:w-full">
                <span className="absolute top-0 bottom-0 m-auto bg-white transition-all duration-300 ease-in left-[22px] w-0 h-0.5 bg-none before:contents[''] before:absolute before:-top-[5px] before:right-0 before:w-3 before:h-3 before:border-t-2 before:border-r-2 before:border-white before:rotate-45 before:block group-hover:w-5"></span>
            </span>
            <span className="transition-all duration-300 ease-in absolute inset-0 py-2 ml-6 text-center font-semibold group-hover:text-white group-hover:ml-9">
                {children}
            </span>
        </button>
    );
};

export default ArrowHoverButton;

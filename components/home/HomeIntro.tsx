import React from "react";
import Heading from "../common/Heading";
import { getUniqueCollection } from "@/lib/actions/collectionActions";

const HomeIntro = async () => {
    const intro = await getUniqueCollection({ slug: "introduction" });
    return (
        <>
            <Heading>{intro?.title}</Heading>
            <p className="text-center leading-relaxed">{intro?.description}</p>
        </>
    );
};

export default HomeIntro;

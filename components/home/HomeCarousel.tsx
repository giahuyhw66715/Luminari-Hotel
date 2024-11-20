import React from "react";
import { getUniqueCollection } from "@/lib/actions/collectionActions";
import AutoplayImages from "../common/AutoplayImages";

const HomeCarousel = async () => {
    const carousel = await getUniqueCollection({ slug: "home-carousel" });

    return <AutoplayImages images={carousel?.images || []} />;
};

export default HomeCarousel;

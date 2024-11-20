import HomeAccommodation from "@/components/home/HomeAccommodation";
import HomeBrands from "@/components/home/HomeBrands";
import HomeCarousel from "@/components/home/HomeCarousel";
import HomeEvent from "@/components/home/HomeEvent";
import HomeExperience from "@/components/home/HomeExperience";
import HomeFollow from "@/components/home/HomeFollow";
import HomeIntro from "@/components/home/HomeIntro";
import HomeLocation from "@/components/home/HomeLocation";
import React from "react";

const HomePage = () => {
    return (
        <>
            <HomeCarousel />
            <div className="container py-20">
                <HomeIntro />
                <HomeAccommodation />
                <HomeExperience />
                <HomeEvent />
            </div>
            <HomeFollow />
            <div className="container">
                <HomeLocation />
                <HomeBrands />
            </div>
        </>
    );
};

export default HomePage;

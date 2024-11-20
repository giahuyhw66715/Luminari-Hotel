import React from "react";
import Heading from "../common/Heading";
import { v4 } from "uuid";
import { Hotel, Mail, Phone, Plane } from "lucide-react";

const contactInfo: { icon: React.ReactNode; children: React.ReactNode }[] = [
    {
        icon: <Hotel className="text-primary" />,
        children: "4567 Starlight Cove, Lumina Island, Hawaii, United States",
    },
    {
        icon: <Phone className="text-primary" />,
        children: (
            <>
                <p className="text-sm">Tel: +84 28 3456 7890</p>
                <p className="text-sm">Fax: +84 28 3456 7891</p>
            </>
        ),
    },
    {
        icon: <Mail className="text-primary" />,
        children: "reservations@luminarihotel.com",
    },
    {
        icon: <Plane className="text-primary" />,
        children: (
            <>
                <p>25 minutes drive from International Airport</p>
                <p>15 minutes drive from the city centre</p>
                <p>A gateway to the many popular attractions</p>
            </>
        ),
    },
];

const HomeLocation = () => {
    return (
        <div className="mt-20">
            <Heading>LOCATION</Heading>
            <div className="grid md:grid-cols-4 gap-5 my-10">
                {contactInfo.map((item) => (
                    <div key={v4()}>
                        {item.icon}
                        <div className="text-sm leading-relaxed mt-2">
                            {item.children}
                        </div>
                    </div>
                ))}
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29708.574342227388!2d-158.03188970939883!3d21.446069784340413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c00670933c5e6b7%3A0x544852c9d73eaf20!2sTown%20Center%20of%20Mililani!5e0!3m2!1sen!2s!4v1729327598413!5m2!1sen!2s"
                width="100%"
                height="400"
                className="border-none"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
};

export default HomeLocation;

import { MAX_WIDTH } from "@/lib/styles";
import {
    Facebook,
    Instagram,
    Linkedin,
    Locate,
    MapPin,
    Phone,
    Twitter,
} from "lucide-react";
import Image from "next/image";

export const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return (
        <div className={`flex flex-col items-center w-full`} id="contact">
            <div className={`w-full h-full bg-green-800 py-16`}>
                <div
                    className={`flex gap-10 flex-col lg:flex-row items-start justify-center lg:items-start lg:justify-between w-fit lg:w-[93%] 2xl:w-full ${MAX_WIDTH} m-auto`}
                >
                    <div className="flex flex-col gap-3">
                        <Image
                            src={
                                "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1715332597/ekavaya_assets/nudl9plxmmvmsejmcqva.jpg"
                            }
                            alt="Banner"
                            width={300}
                            height={100}
                        />

                        <div className="flex gap-3 items-center">
                            <Facebook className="text-white w-4 h-4 min-w-4 min-h-4" />
                            <Instagram className="text-white w-4 h-4 min-w-4 min-h-4" />
                            <Twitter className="text-white w-4 h-4 min-w-4 min-h-4" />
                            <Linkedin className="text-white w-4 h-4 min-w-4 min-h-4" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-6 max-w-44">
                            <h1 className="uppercase text-lg text-white font-bold">
                                Our Office
                            </h1>
                            <div className="flex gap-2 items-start justify-start text-xs">
                                <MapPin className="w-4 h-4 min-w-4 min-h-4 text-orange-400" />
                                <p className="text-white uppercase">
                                    Patahi Chowk, Rewa Road, Muzaffarpur, Bihar,
                                    842001
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 max-w-44">
                            <h1 className="uppercase text-base text-white font-bold">
                                Our Contacts
                            </h1>
                            <div className="flex gap-2 items-start justify-start text-xs">
                                <Phone className="w-4 h-4 min-w-4 min-h-4 text-orange-400" />
                                <div className="flex flex-col gap-2 text-white">
                                    <p>+91 95769 86658</p>
                                    <p>+91 94302 25815</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h1 className="uppercase text-lg text-white font-bold">
                            Opening Time
                        </h1>
                        <div className="grid grid-cols-2 gap-y-3 text-white/60 text-xs">
                            <span>Sunday</span>
                            <span>10:30 AM – 12:30 PM</span>

                            <span>Monday</span>
                            <span>10:00 AM – 06:00 PM</span>

                            <span>Tuesday</span>
                            <span>10:00 AM – 06:00 PM</span>

                            <span>Wednesday</span>
                            <span>10:00 AM – 06:00 PM</span>

                            <span>Thursday</span>
                            <span>10:00 AM – 06:00 PM</span>

                            <span>Friday</span>
                            <span>10:00 AM – 06:00 PM</span>

                            <span>Saturday</span>
                            <span>10:00 AM – 06:00 PM</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-green-800 border-t border-white py-3">
                <p
                    className={`w-[93%] 2xl:w-full ${MAX_WIDTH} m-auto text-center lg:text-start text-xs text-white`}
                >
                    <span>Copyright © 2023-{year} </span>
                    <span className="text-yellow-300 font-bold">
                        Eklavaya Universal{" "}
                    </span>
                    <span>Pvt. Ltd.</span>
                </p>
            </div>
        </div>
    );
};

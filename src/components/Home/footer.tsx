"use client";
import { BANNER_IMAGE } from "@/lib/ASSETS";
import { MAX_WIDTH } from "@/lib/STYLES";
import {
    Facebook,
    Instagram,
    Linkedin,
    MapPin,
    Phone,
    Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return (
        <motion.div
            initial={{
                y: 100,
                opacity: 0,
            }}
            whileInView={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1,
                ease: "easeInOut",
            }}
            className={`flex flex-col items-center w-full`}
            id="contact"
        >
            <div className={`w-full h-full bg-[#19352D] py-12`}>
                <div
                    className={`flex gap-10 flex-col lg:flex-row items-start justify-center lg:items-start lg:justify-between w-fit lg:w-[93%] 2xl:w-full ${MAX_WIDTH} m-auto`}
                >
                    <div className="flex flex-col gap-3">
                        <Image
                            src={BANNER_IMAGE}
                            alt="Banner"
                            width={340}
                            height={140}
                        />

                        <div className="flex gap-3 items-center">
                            <Facebook className="text-white w-5 h-5 min-w-5 min-h-5" />
                            <Instagram className="text-white w-5 h-5 min-w-5 min-h-5" />
                            <Twitter className="text-white w-5 h-5 min-w-5 min-h-5" />
                            <Linkedin className="text-white w-5 h-5 min-w-5 min-h-5" />
                        </div>

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14329.543617204883!2d85.31104777730714!3d26.11895761472644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed172255676c69%3A0x4e9cc1a3b2955cc4!2sEklavaya%20Computer!5e0!3m2!1sen!2sin!4v1718433237752!5m2!1sen!2sin"
                            className="w-full h-52"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-6 max-w-60">
                            <h1 className="uppercase text-xl text-white font-bold">
                                Our Office
                            </h1>
                            <div className="flex gap-2 items-start justify-start text-base">
                                <MapPin className="w-5 h-5 min-w-5 min-h-5 text-orange-400" />
                                <p className="text-white uppercase">
                                    PATAHI, BHAGWANPUR, REWA ROAD, MUZAFFARPUR,
                                    BIHAR, 843113
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col max-w-44">
                            <h1 className="uppercase text-xl mb-4 text-white font-bold">
                                Our Contacts
                            </h1>
                            <div className="flex gap-2 items-start justify-start text-base">
                                <Phone className="w-5 h-5 min-w-5 min-h-5 text-orange-400" />
                                <div className="flex flex-col text-white">
                                    <p>0621-2951300</p>
                                    <p>0621-2951301</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-start justify-start text-base">
                                <Image
                                    src={"/WhatsAppICON.svg"}
                                    width={16}
                                    height={16}
                                    className="w-5 h-5 text-orange-400"
                                    alt="Whatsapp"
                                />
                                <Link
                                    href={"https://wa.me/+919430225815"}
                                    target="_blank"
                                    className="text-white"
                                >
                                    94302-25815
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h1 className="uppercase text-xl text-white font-bold">
                            Opening Time
                        </h1>
                        <div className="grid grid-cols-2 gap-y-3 text-white/60 text-base">
                            <span>Sunday</span>
                            <span>CLOSED</span>

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

            <div className="w-full bg-[#19352D] border-t border-white py-3">
                <p
                    className={`w-[93%] 2xl:w-full ${MAX_WIDTH} m-auto text-center lg:text-start text-sm text-white`}
                >
                    <span>Copyright © 2023-{year} </span>
                    <span className="text-yellow-300 font-bold">
                        Eklavaya Universal{" "}
                    </span>
                    <span>Pvt. Ltd.</span>
                </p>
            </div>
        </motion.div>
    );
};

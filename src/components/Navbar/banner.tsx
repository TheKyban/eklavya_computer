"use client";
import Image from "next/image";
import { motion } from "framer-motion";
export const Banner = () => {
    return (
        <motion.div
            whileInView={{
                rotateX: 0,
            }}
            initial={{
                rotateX: 90,
            }}
            transition={{
                delay: 0.1,
                duration: 1,
            }}
            className="relative w-full m-auto h-[120px] overflow-hidden"
        >
            <Image
                src={
                    "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1715332597/ekavaya_assets/nudl9plxmmvmsejmcqva.jpg"
                }
                fill
                alt="banner"
            />
        </motion.div>
    );
};

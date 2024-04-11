import { FirstPage, SecondPage, ThridPage } from "@/components/Home/home-pages";
import { v2 as cloudinary } from "cloudinary";
import { Prisma } from "../../../../../prisma/prisma";

const fetchCarousels = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_CLOUD_API,
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
    });

    const assets = await cloudinary.api.resources({
        type: "upload",
        prefix: "eklavaya-carousel", // add your folder
    });
    return assets?.resources;
};

const fetchFamilies = async () => {
    const users = await Prisma.user.findMany({
        select: {
            img: true,
            name: true,
            branch: true,
        },
    });

    return users;
};

export default async function Home() {
    try {
        const data = await fetchCarousels();
        const families = await fetchFamilies();
        return (
            <div className="min-h-[calc(100vh-63px)] h-full bg-orange-50 px-2 lg:px-0">
                {/**
                 *
                 * HERO SECTION
                 *
                 */}

                <FirstPage carousel={data} family={families} />

                {/*
                 *
                 * SECOND PAGE
                 *
                 */}

                <SecondPage />

                {/*
                 *
                 * THIRD PAGE
                 *
                 */}

                <ThridPage />
            </div>
        );
    } catch (error) {
        console.log(error);
        return <div>Some thing Went wrong</div>;
    }
}

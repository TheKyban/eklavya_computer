import { CarouselMediaUploader } from "@/components/Dashboard/carousel-setting/carousel-uploader";
import { CarouselImageList } from "@/components/Dashboard/carousel-setting/carousel-image-list";
import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { redirect } from "next/navigation";

export default async function CarouselSettings() {
    /**
     * VERIFY ROLE
     */

    const session = await getServerSession(AUTH_OPTIONS);
    if (session?.user.role !== "ADMIN") {
        return redirect("/dashboard");
    }
    return (
        <div className="max-w-[1500px] m-auto">
            <CarouselMediaUploader />
            <CarouselImageList />
        </div>
    );
}

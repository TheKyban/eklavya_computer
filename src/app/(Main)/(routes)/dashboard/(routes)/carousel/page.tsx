import { CarouselMediaUploader } from "@/components/carousel-setting/carousel-uploader";
import { CarouselImageList } from "@/components/carousel-setting/carousel-image-list";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export default async function CarouselSettings() {
    /**
     * VERIFY ROLE
     */

    const session = await getServerSession(authOptions);
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

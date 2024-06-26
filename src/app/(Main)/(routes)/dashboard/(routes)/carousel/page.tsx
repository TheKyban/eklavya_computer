import { CarouselImageList } from "@/components/Dashboard/carousel-setting/carousel-image-list";
import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { redirect } from "next/navigation";
import { LargeImageUploader } from "@/lib/IMAGE_UPLOADER_LARGE";

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
            <LargeImageUploader apiUrl="/api/carousel" keys={["assets"]} />
            <CarouselImageList />
        </div>
    );
}

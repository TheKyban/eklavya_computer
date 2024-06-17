import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { redirect } from "next/navigation";
import { LargeImageUploader } from "@/lib/IMAGE_UPLOADER_LARGE";
import { UniversityImageList } from "@/components/Dashboard/university-programs/university-image-list";

export default async function UniversityProgramsSetting() {
    /**
     * VERIFY ROLE
     */

    const session = await getServerSession(AUTH_OPTIONS);
    if (session?.user.role !== "ADMIN") {
        return redirect("/dashboard");
    }
    return (
        <div className="max-w-[1500px] m-auto">
            <LargeImageUploader
                apiUrl="/api/universityPrograms"
                keys={["university_programs"]}
            />
            <UniversityImageList />
        </div>
    );
}

import { AddCourse } from "@/components/Dashboard/course/addCourse";
import { CourseList } from "@/components/Dashboard/course/courseList";
import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import { role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CoursePage() {
    const session = await getServerSession(AUTH_OPTIONS);

    if (!session?.user || session?.user.role === role.FRANCHISE) {
        redirect("/dashboard");
    }
    return (
        <div className="px-3 flex flex-col gap-4">
            <AddCourse />
            <CourseList />
        </div>
    );
}

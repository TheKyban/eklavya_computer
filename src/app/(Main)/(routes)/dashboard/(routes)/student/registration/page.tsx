import StudentRegistration from "@/components/Dashboard/student/registration";
import { LoadingCells } from "@/components/loading/loading";
import { Suspense } from "react";

export default function Registration() {
    return (
        <Suspense fallback={<LoadingCells n={14}/>}>
            <StudentRegistration />
        </Suspense>
    );
}

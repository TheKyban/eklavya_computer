import Registration from "@/components/student-zone/Registration";
import { Suspense } from "react";

export default function RegistrationPage() {
    return (
        <Suspense>
            <Registration />
        </Suspense>
    );
}

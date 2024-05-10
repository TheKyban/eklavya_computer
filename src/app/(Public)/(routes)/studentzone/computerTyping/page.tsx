import dynamic from "next/dynamic";

const TypingCertificate = dynamic(
    () => import("@/components/student-zone/TypingCertificate"),
    {
        ssr: false,
    },
);
export default function RegistrationPage() {
    return <TypingCertificate />;
}

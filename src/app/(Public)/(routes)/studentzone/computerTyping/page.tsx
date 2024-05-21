import dynamic from "next/dynamic";

const TypingCertificate = dynamic(
    () => import("@/components/STUDENT_ZONE/COMPUTER_TYPING_CERTIFICATE"),
    {
        ssr: false,
    },
);
export default function RegistrationPage() {
    return <TypingCertificate />;
}

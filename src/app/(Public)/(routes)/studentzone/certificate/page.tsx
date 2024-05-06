import dynamic from "next/dynamic";
const Certificate = dynamic(
    () => import("@/components/student-zone/Certificate"),
    {
        ssr: false,
    },
);

export default function CertificatePage() {
    return <Certificate />;
}

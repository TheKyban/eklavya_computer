import dynamic from "next/dynamic";
const Certificate = dynamic(
    () => import("@/components/STUDENT_ZONE/CERTIFICATE"),
    {
        ssr: false,
    },
);

export default function CertificatePage() {
    return <Certificate />;
}

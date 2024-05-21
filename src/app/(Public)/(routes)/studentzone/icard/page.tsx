import dynamic from "next/dynamic";
const ICard = dynamic(() => import("@/components/STUDENT_ZONE/ICARD"), {
    ssr: false,
});
export default function IcardPage() {
    return <ICard />;
}

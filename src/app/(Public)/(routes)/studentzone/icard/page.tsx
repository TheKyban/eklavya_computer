import dynamic from "next/dynamic";
const ICard = dynamic(() => import("@/components/student-zone/Icard"), {
    ssr: false,
});
export default function IcardPage() {
    return <ICard />;
}

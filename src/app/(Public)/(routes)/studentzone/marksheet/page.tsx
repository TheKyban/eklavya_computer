import dynamic from "next/dynamic";
const MarkSheet = dynamic(() => import("@/components/STUDENT_ZONE/MARKSHEET"), {
    ssr: false,
});
export default function Marksheet() {
    return <MarkSheet />;
}

import dynamic from "next/dynamic";
const MarkSheet = dynamic(() => import("@/components/student-zone/Marksheet"), {
    ssr: false,
});
export default function Marksheet() {
    return <MarkSheet />;
}

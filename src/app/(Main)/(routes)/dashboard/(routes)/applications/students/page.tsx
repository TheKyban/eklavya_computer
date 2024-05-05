import StudentApplicationList from "@/components/application/studentApplicationList";

export default async function StudentApplicationPage({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    return (
        <div>
            <StudentApplicationList page={searchParams.page} />
        </div>
    );
}

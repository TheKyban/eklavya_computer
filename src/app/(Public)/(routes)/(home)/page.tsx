import { FirstPage } from "@/components/Home/home-pages";
import { fetchCarousels, fetchFamilies } from "@/lib/FETCH_FUNTCTIONS";

export default async function Home() {
    try {
        const data = await fetchCarousels();
        const families = await fetchFamilies();
        return (
            <div className="min-h-[calc(100vh-63px)] h-full bg-orange-50">
                <FirstPage carousel={data} family={families} />
            </div>
        );
    } catch (error) {
        console.log(error);
        return <div>Some thing Went wrong</div>;
    }
}

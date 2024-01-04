import { Footer } from "@/components/Home/footer";
import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/styles";

export default function Course() {
    return (
        <>
            <div className={`${MIN_HEIGHT} py-4 m-auto ${MAX_WIDTH} w-full bg-orange-100 text-center`}>
                Courses will be here
            </div>
            {/*
             *
             * FOOTER
             *
             */}

            <Footer />
        </>
    );
}

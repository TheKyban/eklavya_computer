import { Footer } from "@/components/Home/footer";
import { MAX_WIDTH, MIN_HEIGHT } from "@/lib/styles";

export default function Course() {
    return (
        <>
            <div className={`min-h-[${MIN_HEIGHT}] py-4 m-auto max-w-[${MAX_WIDTH}] w-full text-center`}>
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

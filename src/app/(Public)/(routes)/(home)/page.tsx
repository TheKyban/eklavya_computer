import { Footer } from "@/components/Home/footer";
import { FirstPage, SecondPage, ThridPage } from "@/components/Home/home-pages";
export default function Home() {
    return (
        <div className="min-h-screen h-full bg-orange-50 dark:bg-zinc-600  flex items-center justify-center rounded-xl">
            <div className="h-full flex flex-col gap-6 items-center justify-center pb-5 max-w-screen-2xl">
                {/**
                 *
                 * HERO SECTION
                 *
                 */}

                <FirstPage />

                {/*
                 *
                 * SECOND PAGE
                 *
                 */}

                <SecondPage />

                {/*
                 *
                 * THIRD PAGE
                 *
                 */}

                <ThridPage />

                {/*
                 *
                 * FOOTER
                 *
                 */}

                <Footer />
            </div>
        </div>
    );
}

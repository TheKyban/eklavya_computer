import { Footer } from "@/components/Home/footer";
import { FirstPage, SecondPage, ThridPage } from "@/components/Home/home-pages";
export default function Home() {
    return (
        <div className="min-h-[calc(100vh-63px)] h-full bg-orange-50 dark:bg-slate-800 rounded-xl">
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
    );
}

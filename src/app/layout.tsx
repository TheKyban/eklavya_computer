import type { Metadata } from "next";
import { open_sans } from "@/lib/FONTS";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/auth-provider";
import ModalProvider from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/react-query-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DOMAIN_NAME } from "@/lib/CONSTANTS";
import { BANNER_IMAGE } from "@/lib/ASSETS";

export const metadata: Metadata = {
    title: {
        default: "Eklavaya",
        template: "%s | Eklavaya",
    },
    description:
        "EKLAVAYA UNIVERSAL PRIVATE LIMITE(EUPL) is built on a foundation to promote greater access to quality higher education.",
    metadataBase: new URL(DOMAIN_NAME),
    keywords: [
        "eklavaya",
        "eklavaya computer",
        "eklavaya computers",
        "pakri computer",
        "pakri pakohi",
        "eklavaya cable",
        "eklavaya adca",
        "eklavaya dca",
        "eklavaya universal",
        "eklavaya computer muzaffarpur",
        "eklavaya computers muzaffarpur",
    ],
    openGraph: {
        description:
            "EKLAVAYA UNIVERSAL PRIVATE LIMITE(EUPL) is built on a foundation to promote greater access to quality higher education.",
        images: [BANNER_IMAGE],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={open_sans.className}>
                <AuthProvider>
                    <QueryProvider>
                        <>
                            {children}
                            <Toaster />
                            <ModalProvider />
                        </>
                    </QueryProvider>
                </AuthProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}

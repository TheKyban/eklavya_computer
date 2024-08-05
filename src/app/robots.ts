import { DOMAIN_NAME } from "@/lib/CONSTANTS";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/addmission", "/franchiseApply", "/about"],
            disallow: ["/dashboard"],
        },
        sitemap: `${DOMAIN_NAME}/sitemap.xml`,
    };
}

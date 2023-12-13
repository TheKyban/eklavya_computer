import {
    Album,
    BookUser,
    Contact,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Table,
} from "lucide-react";

export const DownloadFiles = [
    {
        title: "Prospectus",
        link: "/Prospectus.pdf",
        icon: BookUser,
        download: "prospectus",
    },
    {
        title: "Admission Form",
        link: "/form/AdmissionForm.pdf",
        icon: Album,
        download: "admissionForm",
    },
    {
        title: "Franchisee Form",
        link: "/form/franchiseeForm.pdf",
        icon: Contact,
        download: "franchiseeForm",
    },
    {
        title: "Sample Ceritificate",
        link: "/samples/sample_certificate.jpg",
        icon: GraduationCap,
        download: "sample_certificate",
    },
    {
        title: "Sample Marksheet",
        link: "/samples/sample_mark.jpg",
        icon: Table,
        download: "sample_marksheet",
    },
];

// Classes
export const LinkStyle =
    "flex gap-2 items-center hover:bg-primary/10 px-3 py-2 rounded transition hover:underline";
export const LinkStyle2 = "text-base font-medium gap-4 py-4 px-3";
export const LinkStyle3 =
    "text-lg font-medium flex items-center gap-3 hover:bg-primary/10 px-3 py-3 rounded-md hover:underline";

/**
 * INFO
 */

export const info = [
    {
        title: "Address",
        icon: MapPin,
        details: ["Patahi Chowk, Rewa Road", "Muzaffarpur, Bihar, 842001"],
    },
    {
        title: "Contact No.",
        icon: Phone,
        details: ["+91 95769 86658", "+91 94302 25815"],
    },
    {
        title: "Email",
        icon: Mail,
        details: ["aaditya1392@gmail.com", "aaditya1392@gmail.com"],
    },
];

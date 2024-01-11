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

/**
 * DOWNLOADABLE FILES
 */

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

/**
 * ADDRESS AND INFO
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
        details: ["eklavaya@gmail.com", "example@gmail.com"],
    },
];

/**
 * RESULTS PER PAGE
 */
export const per_page = 10;

/**
 * COURSE
 */
export const Courses = [
    "C",
    "ADCA",
    "ADCA Plus",
    "ADCTT",
    "ADHN",
    "ADIT",
    "ADIT+",
    "Advance Excel",
    "CCA",
    "CFA",
    "CFA Plus",
    "Computer Typing",
    "DAA",
    "DCA",
    "DCP",
    "DCTT",
    "DDEO",
    "DFA",
    "DHN",
    "DHT",
    "DOA",
    "DTP",
    "DWD",
    "HDCA",
    "HDIT",
    "Java",
    "MRC",
    "PDDTP",
];


export const IMAGE_SIZE = 40000
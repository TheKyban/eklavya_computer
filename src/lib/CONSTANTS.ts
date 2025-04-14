/**
 * RESULTS PER PAGE
 */
export const per_page = 100;

const SECONDS_IN_A_DAY = 60 * 60 * 24;
const SECONDS_IN_A_MONTH = SECONDS_IN_A_DAY * 30;

export const Duration = {
    "1 Month": SECONDS_IN_A_MONTH,
    "2 Months": SECONDS_IN_A_MONTH * 2,
    "3 Months": SECONDS_IN_A_MONTH * 3,
    "4 Months": SECONDS_IN_A_MONTH * 4,
    "5 Months": SECONDS_IN_A_MONTH * 5,
    "6 Months": SECONDS_IN_A_MONTH * 6,
    "7 Months": SECONDS_IN_A_MONTH * 7,
    "8 Months": SECONDS_IN_A_MONTH * 8,
    "9 Months": SECONDS_IN_A_MONTH * 9,
    "10 Months": SECONDS_IN_A_MONTH * 10,
    "11 Months": SECONDS_IN_A_MONTH * 11,
    "12 Months": SECONDS_IN_A_MONTH * 12,
};

export const IMAGE_SIZE = 40000;

export const DOCUMENT_SIZES = {
    I_CARD: {
        width: 204,
        height: 324,
    },
    MARKSHEET: {
        width: 796.8,
        height: 1123.2,
    },
    TYPING_CERTIFICATE: {
        height: 848,
    },
    CERTIFICATE: {
        height: 875,
        width: 1062,
    },
};

export const DATE_FORMAT = "dd/MM/yyyy";

export const DOMAIN_NAME = "https://eklavayacomputer.com";

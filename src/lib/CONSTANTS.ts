/**
 * RESULTS PER PAGE
 */
export const per_page = 50;

const SECONDS_IN_A_DAY = 60 * 60 * 24;
const SECONDS_IN_A_MONTH = SECONDS_IN_A_DAY * 30;

export const Duration = {
    "One Month": SECONDS_IN_A_MONTH,
    "Two Months": SECONDS_IN_A_MONTH * 2,
    "Three Months": SECONDS_IN_A_MONTH * 3,
    "Four Months": SECONDS_IN_A_MONTH * 4,
    "Five Months": SECONDS_IN_A_MONTH * 5,
    "Six Months": SECONDS_IN_A_MONTH * 6,
    "Seven Months": SECONDS_IN_A_MONTH * 7,
    "Eight Months": SECONDS_IN_A_MONTH * 8,
    "Nine Months": SECONDS_IN_A_MONTH * 9,
    "Ten Months": SECONDS_IN_A_MONTH * 10,
    "Eleven Months": SECONDS_IN_A_MONTH * 11,
    "Twelve Months": SECONDS_IN_A_MONTH * 12,
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
        height: 848,
    },
};

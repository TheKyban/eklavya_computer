import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * For Franchise registration
 */
export const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const franchiseSchema = z
    .object({
        img: z.string({ required_error: "Please select a picture" }),
        name: z
            .string({ required_error: "Please Enter email id" })
            .trim()
            .min(2, { message: "Name must be atleast 2 characters." }),
        email: z
            .string({ required_error: "Please Enter email id" })
            .trim()
            .email({ message: "Invalid Email id" })
            .min(4, { message: "Please Enter Valid Email id" }),
        phone: z
            .string({ required_error: "Please Enter phone number" })
            .trim()
            .regex(phoneRegex, "Invalid phone number")
            .min(10, { message: "Invalid phone number" })
            .max(10, { message: "Invalid phone number" }),
        state: z.string({ required_error: "Please Select State" }),
        district: z.string({ required_error: "Please Select District" }),
        pincode: z
            .string({ required_error: "Please Enter pin code" })
            .trim()
            .min(6, { message: "Enter valid pin code" }),
        address: z
            .string({ required_error: "Please Enter address" })
            .trim()
            .min(10, { message: "Please enter valid address" }),
        branch: z
            .string({ required_error: "Please Enter branch name" })
            .trim()
            .min(5, { message: "Enter valid branch name" }),
        userId: z
            .string({ required_error: "Please Enter User id" })
            .trim()
            .regex(phoneRegex, "Invalid User id")
            .min(5, { message: "Userid must be 5 characters" })
            .max(5, { message: "Userid must be 5 characters" }),
        password: z
            .string({ required_error: "Please Enter password" })
            .trim()
            .min(8, { message: "password must be atleast 8 characters" }),
        confirmPassword: z
            .string({ required_error: "Please Enter Confirm Password." })
            .min(8),
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        { message: "Password must match!", path: ["confirmPassword"] }
    );

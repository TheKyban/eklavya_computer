import * as z from "zod";

/**
 * PHONE NUMBER VALIDATOR
 */
export const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

/**
 * USER REGISTRATION SCHEMA
 */
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
            .min(5, { message: "Userid must be 5 characters" }),
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

/**
 * USER EDIT SCHEMA
 */
export const franchiseEditSchema = z.object({
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
        .min(5, { message: "Userid must be 5 characters" }),
    password: z
        .string({ required_error: "Please Enter password" })
        .trim()
        .min(8, { message: "password must be atleast 8 characters" }),
    isActive: z.string(),
    role: z.string(),
    id: z.string(),
});

/**
 * STUDENT SCHEMA
 */

export const studentSchema = z.object({
    img: z
        .string({ required_error: "Please select a picture" })
        .min(50, { message: "Please select a picture" }),
    name: z
        .string({ required_error: "Please Enter Name" })
        .trim()
        .min(2, { message: "Name must be atleast 2 characters." }),
    motherName: z
        .string({ required_error: "Please Enter Mother Name" })
        .trim()
        .min(2, { message: "Name must be atleast 2 characters." }),
    fatherName: z
        .string({ required_error: "Please Enter Father Name" })
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
    state: z
        .string({ required_error: "Please Select State" })
        .min(3, { message: "Select valid state" }),
    district: z
        .string({ required_error: "Please Select District" })
        .min(3, { message: "Select valid district" }),
    pincode: z
        .string({ required_error: "Please Enter pin code" })
        .trim()
        .min(6, { message: "Enter valid pin code" }),
    address: z
        .string({ required_error: "Please Enter address" })
        .trim()
        .min(10, { message: "Please enter valid address" }),
    branch: z.string().min(5, { message: "Branch id is required" }),
    dob: z.date({ required_error: "Please select dob" }),
    dor: z.date(),
    gender: z
        .string({ required_error: "Gender is required." })
        .min(4, { message: "Please select gender" }),
    course: z
        .string({ required_error: "Course is required." })
        .min(2, { message: "Please select course" }),
    formNumber: z
        .string({ required_error: "Form number is required." })
        .min(4, { message: "Enter valid form number" }),
    qualification: z.string(),
});

export const typingSpeedMarkSchema = z.object({
    formNumber: z
        .string({ required_error: "Select Registration Number" })
        .min(5, { message: "Select registration number" }),
    english: z
        .number({ required_error: "Enter marks for English" })
        .min(0, { message: "marks cannot less than 0" })
        .max(100, { message: "marks cannot be greater than 100" }),
    hindi: z
        .number({ required_error: "Enter marks for Hindi" })
        .min(0, { message: "marks cannot less than 0" })
        .max(100, { message: "marks cannot be greater than 100" }),
});

export const generalMarksSchema = z.object({
    formNumber: z
        .string({ required_error: "Select Registration Number" })
        .min(5, { message: "Select registration number" }),
    written: z
        .number({ required_error: "Enter marks for English" })
        .min(1, { message: "marks cannot less than 0" })
        .max(100, { message: "marks cannot be greater than 100" }),
    practical: z
        .number({ required_error: "Enter marks for Practical" })
        .min(0, { message: "marks cannot less than 0" })
        .max(100, { message: "marks cannot be greater than 100" }),
    viva: z
        .number({ required_error: "Enter marks for Viva" })
        .min(0, { message: "marks cannot less than 0" })
        .max(100, { message: "marks cannot be greater than 100" }),
    project: z
        .number({ required_error: "Enter marks for Project" })
        .min(0, { message: "marks cannot less than 0" })
        .max(100, { message: "marks cannot be greater than 100" }),
});

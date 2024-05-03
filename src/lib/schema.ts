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
        img: z
            .string({ required_error: "Please select a picture" })
            .trim()
            .min(2, "image is required."),
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
            .min(3, { message: "Enter valid branch name" }),
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

export const userApplicationSchema = z.object({
    img: z
        .string({ required_error: "Please select a picture" })
        .trim()
        .min(2, "image is required."),
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
        .min(3, { message: "Enter valid branch name" }),
});

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
    registration: z
        .string({ required_error: "Form number is required." })
        .min(4, { message: "Enter valid form number" }),
    qualification: z.string(),
});

export const studentAddmissionSchema = z.object({
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
    qualification: z.string(),
});

export const typingSpeedMarkSchema = z.object({
    registration: z
        .string({ required_error: "Select Registration Number" })
        .min(5, { message: "Select registration number" }),
    englishTyping: z
        .number({ required_error: "Enter marks for English" })
        .min(1, { message: "marks cannot less than 1" })
        .max(100, { message: "marks cannot be greater than 100" }),
    hindiTyping: z
        .number({ required_error: "Enter marks for Hindi" })
        .min(1, { message: "marks cannot less than 1" })
        .max(100, { message: "marks cannot be greater than 100" }),
});

export const generalMarksSchema = z.object({
    registration: z
        .string({ required_error: "Select Registration Number" })
        .min(5, { message: "Select registration number" }),
    written: z
        .number({ required_error: "Enter marks for English" })
        .min(1, { message: "marks cannot less than 1" })
        .max(100, { message: "marks cannot be greater than 100" }),
    practical: z
        .number({ required_error: "Enter marks for Practical" })
        .min(1, { message: "marks cannot less than 1" })
        .max(100, { message: "marks cannot be greater than 100" }),
    viva: z
        .number({ required_error: "Enter marks for Viva" })
        .min(1, { message: "marks cannot less than 1" })
        .max(100, { message: "marks cannot be greater than 100" }),
    project: z
        .number({ required_error: "Enter marks for Project" })
        .min(1, { message: "marks cannot less than 1" })
        .max(100, { message: "marks cannot be greater than 100" }),
});

export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string({ required_error: "Enter current Password." })
            .min(8, { message: "Enter valid current password." }),
        password: z
            .string({ required_error: "Please enter new password" })
            .trim()
            .min(8, { message: "password must be atleast 8 characters" }),
        confirmPassword: z
            .string({ required_error: "Please enter confirm password." })
            .min(8),
    })
    .refine(
        (value) => {
            return value.currentPassword !== value.password;
        },
        { message: "Password cannot be same.", path: ["password"] }
    )
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        { message: "Password must match!", path: ["confirmPassword"] }
    );

export const courseSchema = z.object({
    name: z
        .string({ required_error: "Enter course name." })
        .min(3, { message: "Enter valid course name." })
        .trim()
        .toUpperCase(),
    fullName: z
        .string({ required_error: "Enter course full name." })
        .min(10, { message: "Enter valid course full name." }),
    duration: z
        .string({ required_error: "Enter course duration." })
        .min(10, { message: "Enter valid course duration" }),
    modules: z.string({ required_error: "Enter course modules." }),
});
export const courseEditSchema = z.object({
    name: z
        .string({ required_error: "Enter course name." })
        .min(3, { message: "Enter valid course name." })
        .trim()
        .toUpperCase(),
    fullName: z
        .string({ required_error: "Enter course full name." })
        .min(10, { message: "Enter valid course full name." }),
    duration: z
        .string({ required_error: "Enter course duration." })
        .min(10, { message: "Enter valid course duration" }),
    id: z
        .string({ required_error: "Id is required." })
        .min(10, { message: "Id is required." }),
    modules: z.string({ required_error: "Enter course modules." }),
});

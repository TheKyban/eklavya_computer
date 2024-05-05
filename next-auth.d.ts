import { User, role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            role: role;
            email: string;
            userId: string;
            isActive: boolean;
            branch: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT extends User {}
}

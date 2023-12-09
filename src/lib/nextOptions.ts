import nextAuth, { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "../../prisma/prisma";
const NextOptions = {
    adapter: PrismaAdapter(Prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        credentialsProvider({
            name: "credentials",
            credentials: {
                userId: { label: "UserId", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // check to see if email and password is there
                if (!credentials?.userId || !credentials?.password) {
                    throw new Error("Please enter an email and password");
                }

                // check to see if user exists
                const user = await Prisma.user.findUnique({
                    where: {
                        userId: credentials.userId,
                    },
                });
                if (!user) {
                    throw new Error("User not found");
                }

                if (user.password != credentials.password) {
                    throw new Error("user id or password may wrong");
                }
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/",
        error:"/login"
    },
} satisfies NextAuthOptions;
export default NextOptions;

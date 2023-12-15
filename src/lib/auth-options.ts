import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Prisma } from "../../prisma/prisma";

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
        error: "/login",
    },

    providers: [
        Credentials({
            credentials: {
                userId: {
                    type: "text",
                },
                password: {
                    type: "text",
                },
            },
            async authorize(credentials, request) {
                try {
                    if (!credentials?.password || !credentials?.userId) {
                        throw new Error("Invalid Credentials");
                    }

                    const user = await Prisma.user.findUnique({
                        where: {
                            userId: credentials?.userId,
                            password: credentials?.password,
                        },
                    });
                    if (!user) {
                        throw new Error("Wrong credentials");
                    }
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        userId: user.userId,
                        role: user.role,
                    };
                } catch (error) {
                    console.log(error);
                    throw new Error("Wrong credentials");
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // @ts-ignore
                token.role = user?.role;
                // @ts-ignore
                token.userId = user?.userId;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token?.role;
                session.user.userId = token?.userId;
            }
            return session;
        },

        redirect({ baseUrl, url }) {
            return `${baseUrl}/dashboard`;
        },
    },
};

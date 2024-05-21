import { AUTH_OPTIONS } from "@/lib/AUTH_OPTIONS";
import NextAuth from "next-auth";

const auth = NextAuth(AUTH_OPTIONS);
export { auth as GET, auth as POST };

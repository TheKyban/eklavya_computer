import NextAuth from "next-auth";
import NextOptions from "@/lib/nextOptions";

const handler = NextAuth(NextOptions);
export { handler as POST, handler as GET };

import { db } from "@/db";
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { Adapter } from "next-auth/adapters"
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user : {
            id: string;
        } & DefaultSession["user"];
    }
}

export const authConfig = {
    adapter: DrizzleAdapter(db) as Adapter,
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            // when we login for frist time it will try and find a user that matches the token.
            const dbUser = await db.query.users.findFirst({
                where: (users, {eq}) => eq(users.email, token.email!)
            }) 

            // if no user found throw error.
            if (!dbUser) throw new Error("No User with the Email found.");
            
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image
            }
        },
        async session({token, session}) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name,
                    email: token.email,
                    image: token.picture
                }
            }
            return session;
        }
    }
} satisfies AuthOptions;

export function getSession() {
    return getServerSession(authConfig);
}
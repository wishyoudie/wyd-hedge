import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";
import { createUserOrUpdate } from "~/server/queries";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    image?: string;
    email: string;
    tg_id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
  }
  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "telegram-login",
      name: "Telegram Login",
      credentials: {},
      async authorize(_, req) {
        const validator = new AuthDataValidator({
          botToken: `${process.env.BOT_TOKEN}`,
        });

        const data = objectToAuthDataMap(req.query ?? {});
        const user = await validator.validate(data);

        if (user.id && user.first_name) {
          const returned = {
            id: user.id.toString(),
            tg_id: user.id,
            email: user.id.toString(),
            name: [user.first_name, user.last_name ?? ""].join(" "),
            image: user.photo_url,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            photo_url: user.photo_url,
          };

          createUserOrUpdate(user).catch(console.error);

          return returned;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      session.user.id = session.user.email;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

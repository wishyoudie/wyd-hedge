import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";
import { createUserOrUpdate } from "~/server/queries";

declare module "next-auth" {
  interface Session {
    user: {
      tg_id: number;
      first_name: string;
      last_name: string;
      username: string;
      photo_url?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "telegram-login",
      name: "Telegram Login",
      credentials: {},
      async authorize(credentials, req) {
        const validator = new AuthDataValidator({
          // botToken: `${process.env.BOT_TOKEN}`,
          botToken: "6339130363:AAFnWQam_pPhS2ULsv80QsXU7RDphNsYYww",
        });

        const data = objectToAuthDataMap(req.query || {});
        const user = await validator.validate(data);

        if (user.id && user.first_name) {
          const returned = {
            tg_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            photo_url: user.photo_url,
          };

          try {
            await createUserOrUpdate(user);
          } catch {
            console.log("Something went wrong while creating the user.");
          }

          return returned;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      //   session.user.tg_id = session.user.tg_id;
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

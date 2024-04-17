import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validate, parse } from "@tma.js/init-data-node";
import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";
import { createUserOrUpdate } from "~/server/queries";
import { env } from "~/env";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    image?: string;
    email: string;
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
        if (req.query) {
          const { is_tma, ...request } = req.query;
          const token = env.BOT_TOKEN;
          console.log(is_tma);
          console.log(request);

          if (is_tma === true) {
            console.log("Authorizing from TMA");

            try {
              validate(request.initData, token);
              const parsed = parse(request.initData).user;
              if (!parsed) {
                throw new Error("Empty parsed initData");
              }

              const user = {
                id: parsed.id,
                first_name: parsed.firstName,
                last_name: parsed.lastName,
                username: parsed.username,
                photo_url: parsed.photoUrl,
              };

              createUserOrUpdate(user).catch(console.error);

              return {
                id: `${parsed.id}`,
                name: [parsed.firstName, parsed.lastName ?? ""].join(" "),
                email: `${parsed.id}`,
                tg_id: parsed.id,
                image: parsed.photoUrl,
                first_name: parsed.firstName,
                last_name: parsed.lastName,
                username: parsed.username,
                photo_url: parsed.photoUrl,
              };
            } catch (e) {
              console.error(e);
            }
          } else {
            console.log("Authorizing from LoginWidget");

            const validator = new AuthDataValidator({
              botToken: token,
            });

            const data = objectToAuthDataMap(request ?? {});
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
          }
        } else {
          console.error("Empty Auth Request");
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
    error: "/lol",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

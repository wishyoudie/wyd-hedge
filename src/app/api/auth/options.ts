import type { NextAuthOptions, User, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import {
  createUser,
  generatePasswordHash,
  getUserByUsername,
} from "@/server/users";
import { getServerSession as _getServerSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    currency: string;
    username?: string | null;
  }
  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "username", type: "username" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await getUserByUsername(credentials.username);

        if (user) {
          if (user.password === generatePasswordHash(credentials.password)) {
            const returned: User = {
              id: user.id,
              username: user.username,
              currency: user.currency,
            };

            return returned;
          } else {
            throw new Error(
              JSON.stringify({
                en: "Incorrect username or password",
                ru: "Неверное имя пользователя или пароль",
              }),
            );
          }
        }

        throw new Error(
          JSON.stringify({
            en: "Incorrect username or password",
            ru: "Неверное имя пользователя или пароль",
          }),
        );

        // return null;
      },
    }),
    CredentialsProvider({
      id: "register",
      name: "register",
      credentials: {
        username: { label: "username", type: "username" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await getUserByUsername(credentials.username);

        if (user) {
          throw new Error(
            JSON.stringify({
              en: "User already exists",
              ru: "Пользователь с таким именем пользователя уже существует",
            }),
          );
        }

        const newUser = await createUser({
          username: credentials.username,
          password: credentials.password,
        });

        if (newUser) {
          const returned: User = {
            id: newUser.id,
            username: newUser.username,
            currency: newUser.currency,
          };

          return returned;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/dashboard?tutorial=true",
  },
  callbacks: {
    signIn: async ({ profile }) => {
      if (profile) {
        try {
          // Sign up, throws when encounters conflicting usernames
          await createUser({ username: profile.email });
        } catch {
          // Here user uses same OAuth second time => already signed up
          // console.log("Signed up lol");
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      //@ts-expect-error Forcing unknown
      session.user = token.user;
      return session;
    },
  },
};

export async function getServerSession(): Promise<Session | null> {
  return await _getServerSession(authOptions);
}

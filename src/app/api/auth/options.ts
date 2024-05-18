import type { NextAuthOptions, User, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { parse, validate } from "@tma.js/init-data-node";
import { env } from "@/env";
import {
  createUser,
  generatePasswordHash,
  getUserByTelegramUsername,
  getUserByUsername,
} from "@/server/users";
import { getServerSession as _getServerSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    currency: string;
    username?: string | null;
    isPremium: boolean;
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
              isPremium: user.isPremium,
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
            isPremium: newUser.isPremium,
          };

          return returned;
        }

        return null;
      },
    }),
    CredentialsProvider({
      id: "telegram",
      name: "telegram",
      credentials: {
        initData: {},
      },
      async authorize(credentials) {
        if (!credentials?.initData) {
          return null;
        }

        try {
          validate(credentials.initData, env.BOT_TOKEN);
          const { username } = parse(credentials.initData).user!;
          const user = await getUserByTelegramUsername(username!);

          if (user) {
            const returned: User = {
              id: user.id,
              username: user.username,
              currency: user.currency,
              isPremium: user.isPremium,
            };

            return returned;
          }
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/app/dashboard?tutorial=true",
  },
  callbacks: {
    signIn: async ({ profile, user }) => {
      if (profile) {
        try {
          // Sign up, throws when encounters conflicting usernames
          const newUser = await createUser({ username: profile.email });

          if (newUser) {
            user.id = newUser.id;
            user.username = newUser.username;
            user.isPremium = newUser.isPremium;
          }
        } catch {
          // Here user uses same OAuth second time => already signed up
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user?.email) {
        const dbUser = await getUserByUsername(user.email);
        if (dbUser) {
          token.user = {
            id: dbUser.id,
            name: user.name,
            email: user.email,
            username: dbUser.username,
            currency: dbUser.currency,
            image: user.image,
            isPremium: dbUser.isPremium,
          };
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      //@ts-expect-error Forcing unknown
      session.user = token.user;
      return session;
    },
  },
};

export async function getServerSession(): Promise<Session> {
  const session = await _getServerSession(authOptions);
  return session!;
}

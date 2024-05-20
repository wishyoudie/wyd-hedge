import type { NextAuthOptions, User, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { parse, validate } from "@tma.js/init-data-node";
import { env } from "@/env";
import {
  createUser,
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

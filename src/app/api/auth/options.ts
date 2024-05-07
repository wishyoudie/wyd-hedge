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
import { useSession as _useSession } from "next-auth/react";

declare module "next-auth" {
  interface User {
    id: number;
    currency: string;
    username?: string | null;
    suggestTurorial: boolean;
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

        if (
          user &&
          user.password === generatePasswordHash(credentials.password)
        ) {
          const returned: User = {
            id: user.id,
            username: user.username,
            currency: user.currency,
            suggestTurorial: false,
          };

          return returned;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/web/new",
  },
  callbacks: {
    signIn: async ({ profile }) => {
      if (profile) {
        const { email } = profile;
        const username = email!.split("@")[0]!;
        await createUser({ username });
      }
      return true;
    },
  },
};

export async function getServerSession(): Promise<Session | null> {
  return await _getServerSession(authOptions);
}

export function useSession() {
  return _useSession();
}

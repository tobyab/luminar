import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/utils/prisma";
import NextAuth from "next-auth/next";

// @ts-ignore
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  callbacks: {
    signIn: async ({ user, account }: any) => {
      const returningUser = await prisma.user.findUnique({
        where: { email: user.email as string },
        select: { name: true },
      });

      if (account.provider === "google") {
        // if the user has signed up through email, this updates their name and image to correspond with their Google account.
        if (returningUser && !returningUser.name) {
          await prisma.user.update({
            where: { email: user.email as string },
            data: {
              name: user.name as string,
              image: user.image as string,
            },
          });
        }
      }

      if (!returningUser) {
        await prisma.user.create({
          data: {
            email: user.email as string,
            name: user.name as string,
          },
        });
      }
      return true;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.user = user;
      }

      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        token.user = refreshedUser;
        token.name = refreshedUser?.name;
        token.email = refreshedUser?.email;
        token.image = refreshedUser?.image;
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          image: token.picture,
        },
      };
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const email = message.user.email as string;
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            createdAt: true,
          },
        });
        if (
          user?.createdAt &&
          new Date(user.createdAt).getTime() === new Date().getTime()
        ) {
          console.log("new user!");
        }
      }
    },
  },
});

export { handler as GET, handler as POST };

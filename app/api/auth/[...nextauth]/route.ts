  import NextAuth, { NextAuthOptions } from "next-auth";
  import CredentialsProvider from "next-auth/providers/credentials";
  import GoogleProvider from "next-auth/providers/google"; // ✅ Add this
  import FacebookProvider from "next-auth/providers/facebook"; // ✅ Add this
  import TwitterProvider from "next-auth/providers/twitter"; // ✅ Add this
  import { PrismaClient } from "@prisma/client";
  import bcrypt from "bcrypt";

  const prisma = new PrismaClient();

  export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;

          return {  id: user.id.toString(), name: user.name, email: user.email };
        },
      }),
      // ✅ Google login
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID!,
        clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        version: "2.0", // Important: use Twitter OAuth 2.0
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.email = token.email as string;
        }
        return session;
      },
      async signIn({ user, account, profile }) {
        if (account?.provider === "google") {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });
    
          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name ?? "No Name",
                email: user.email!,
                password: "OAuth2 ",
                profilePic: user.image ?? ""
              },
            });
          }
        } else if (account?.provider === "facebook") {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });
    
          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name ?? "No Name",
                email: user.email!,
                password: "OAuth2 ",
                profilePic: user.image ?? ""
              },
            });
          }
        } else if (account?.provider === "twitter") {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name ?? "No Name",
                email: user.email!,
                password: "OAuth2 ",
                profilePic: user.image ?? ""
              },
            });
          }
        }
        return true; // allow sign-in
      },
    }
    ,
    pages: {
      signIn: "/login",
    },
  };

  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };

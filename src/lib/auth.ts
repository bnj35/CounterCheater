import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { steamAuthPlugin } from "./steam-auth-plugin";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    plugins: [
        steamAuthPlugin({
            steamApiKey: process.env.STEAM_API_KEY!,
        })
    ],
});
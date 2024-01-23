/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/api";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
    getUserByUsername: publicProcedure.input(z.object({username: z.string()})).query(async ({ input }) => {
        const [user] = await clerkClient.users.getUserList({
            username: [input.username]
        });
        return user;
    })
});

/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/api";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type UserPostInfo = {imageUrl: string, username: string | null, firstName: string | null}

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
    });
    const users: User[] = await clerkClient.users.getUserList({
      userId: [...new Set(posts.map((post) => post.authorId))],
      limit: 100,
    })
    const userPostInfoById: { [id: string]: UserPostInfo } = {}
    users.forEach(({id, imageUrl, username, firstName}) => {
      userPostInfoById[id] = {imageUrl, username, firstName}
    })
    return posts.map(post => ({ post, user: userPostInfoById[post.authorId] }))
  }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});

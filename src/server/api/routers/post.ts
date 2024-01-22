/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/api";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

type UserPostInfo = {imageUrl: string, username: string | null, firstName: string | null}

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc"}]
    });
    const users: User[] = await clerkClient.users.getUserList({
      userId: [...new Set(posts.map((post) => post.authorId))],
      limit: 100,
    })
    const userPostInfoById: { [id: string]: UserPostInfo } = {}
    users.forEach(({id, imageUrl, username, firstName}) => {
      userPostInfoById[id] = {imageUrl, username, firstName}
    })
    return posts.map(post => ({ post, author: userPostInfoById[post.authorId] }))
  }),
  create: protectedProcedure.input(z.object({content: z.string({description: "Tweets must be less than 240 charaters"}).min(1).max(240)})).mutation(({ ctx, input }) => {
    const authorId = ctx.currentUserId;
    const post = ctx.db.post.create({
      data: {
        authorId,
        message: input.content
      }
    });
    return post
  }),
});

import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const postRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const filterUserForClient = (user: User) => {
      return {
        id: user.id,
        username: user.username,
        profileImageUrl: user.profileImageUrl,
        email: user.emailAddresses,
      };
    };

    const posts = await ctx.prisma.post.findMany({
      orderBy: { createdAt: "desc", id: "desc" },
      take: 100,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);

      if (!author || !author.username)
        throw new TRPCError({
          message: "Author for post not found",
          code: "INTERNAL_SERVER_ERROR",
        });

      return {
        post,
        author: {
          ...author,
          username: author.username, // put this here to make TS not show null option here ¯\_(ツ)_/¯
        },
      };
    });
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findFirst({ where: { id: input } });
  }),

  create: protectedProcedure
    .input(
      z.object({
        content: z.string().emoji().min(1).max(280),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.auth.userId;
      console.log("authorId", authorId);
      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          content: input.content,
        },
      });
      return post;
    }),

  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.post.delete({ where: { id: input } });
  }),
});

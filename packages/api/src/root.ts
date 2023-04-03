import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { router } from "./trpc";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

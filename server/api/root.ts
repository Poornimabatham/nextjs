// server/api/root.ts
import { createTRPCRouter } from '../api/trpc';
import { taskRouter } from './routers/task';

export const appRouter = createTRPCRouter({
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

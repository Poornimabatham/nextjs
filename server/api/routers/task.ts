import { createTRPCRouter, publicProcedure } from '../trpc';

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from('tasks').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data || []; // Always return array, never undefined
  }),
});

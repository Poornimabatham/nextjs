import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const taskRouter = createTRPCRouter({
  // Get all tasks
  getAll: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from('tasks').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data || [];
  }),

  // Delete a task by ID
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('tasks')
        .delete()
        .eq('id', input.id);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    }),
});

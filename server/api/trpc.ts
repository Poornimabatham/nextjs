// server/api/trpc.ts
import { initTRPC } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export const createTRPCContext = async ({ req, res }: CreateNextContextOptions) => {
  const supabase = createServerSupabaseClient({ req, res });
  return {
    supabase,
    req,
    res,
  };
};

// 👇 Create typed context
type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

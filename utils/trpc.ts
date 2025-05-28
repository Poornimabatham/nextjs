// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../server/api/root';

export const api = createTRPCReact<AppRouter>();
export const trpc = createTRPCReact<AppRouter>();
 
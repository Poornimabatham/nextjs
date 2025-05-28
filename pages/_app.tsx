import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import type { AppRouter } from '../server/api/root';
import type { AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';

import { httpBatchLink } from '@trpc/client';

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR on vercel
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR
}

export default withTRPC<AppRouter>({
  config() {
    return {
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
})(MyApp);

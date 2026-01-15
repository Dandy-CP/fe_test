import '@/styles/globals.css';
import 'moment/locale/id';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';
import moment from 'moment';

// Declare moment with "indonesia" locale
moment.locale('id');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>FE TEST JASAMARGA</title>
      </Head>

      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

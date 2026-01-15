import '@/styles/globals.css';
import 'moment/locale/id';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import moment from 'moment';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material';
import { queryClient } from '@/config/queryClient';
import theme from '@/config/theme';
import AuthProvider from '@/context/AuthProvider';
import Layout from '@/components/layout/Layout';

// Declare moment with "indonesia" locale
moment.locale('id');

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageNoLayout = ['/auth', '/signup', '/_error'];

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>FE TEST JASAMARGA</title>
        </Head>

        <AuthProvider>
          {pageNoLayout.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <Layout path={router.pathname}>
              <Component {...pageProps} />
            </Layout>
          )}
        </AuthProvider>
      </QueryClientProvider>

      <ToastContainer />
    </ThemeProvider>
  );
}

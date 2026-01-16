import '@/styles/globals.css';
import 'moment/locale/id';
import Head from 'next/head';
import { useRouter } from 'next/router';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material';
import AuthProvider from '@/context/AuthProvider';
import Layout from '@/components/layout/Layout';
import theme from '@/config/theme';
import type { AppProps } from 'next/app';

// Declare moment with "indonesia" locale
moment.locale('id');

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageNoLayout = ['/auth', '/_error'];

  return (
    <ThemeProvider theme={theme}>
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

      <ToastContainer />
    </ThemeProvider>
  );
}

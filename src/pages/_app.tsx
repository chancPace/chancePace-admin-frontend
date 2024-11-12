import NotPc from '@/features/NotPc';
import { GlobalStyled } from '@/styles/global';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { Provider } from 'react-redux';
import { persistor, store } from '@/utill/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppWrapper from '@/layouts/AppWrapper';
import Cookies from 'js-cookie';
import LoginPage from '@/features/LoginPage';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const [notPc, setNotPc] = useState(false);
  const [token, setToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getToken = Cookies.get('adminToken');
    if (getToken) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setNotPc(true);
      } else {
        setNotPc(false);
      }
    };

    // 초기 width 확인
    handleResize();

    // resize 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Head>
        <title>🛠ChancePaceAdmin</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {notPc ? <NotPc /> : !token ? <LoginPage /> : <AppWrapper Component={Component} pageProps={pageProps} />}
          </PersistGate>
        </Provider>
      </ThemeProvider>
      <GlobalStyled />
    </>
  );
}

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
import SignupPage from '@/features/SignupPage';

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

  // 로그인 또는 회원가입 페이지를 렌더링하기 위한 조건 처리
  const renderAuthPage = () => {
    if (router.pathname === '/signup') {
      return <SignupPage />; // 회원가입 페이지로 이동한 경우
    }
    return <LoginPage />; // 기본적으로 로그인 페이지
  };

  return (
    <>
      <Head>
        <title>CHAN'SPACE ADMIN</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {notPc ? <NotPc /> : !token ? renderAuthPage() : <AppWrapper Component={Component} pageProps={pageProps} />}
          </PersistGate>
        </Provider>
      </ThemeProvider>
      <GlobalStyled />
    </>
  );
}

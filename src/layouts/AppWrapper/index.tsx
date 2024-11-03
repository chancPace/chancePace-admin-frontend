import Template from '@/layouts/Template';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { logout, setUser } from '@/utill/redux/slices/userSlice';
import { getUser } from '@/pages/api/userApi';
import Header from '@/features/Header';
import { RootState } from '@/utill/redux/store';

const AppWrapper = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const adminToken = Cookies.get('adminToken');

  const fetchUserData = async () => {
    if (adminToken) {
      try {
        const userData = await getUser(adminToken);
        if (userData.result) {
          dispatch(
            setUser({
              email: userData.data.email,
              name: userData.data.name,
              role: userData.data.role,
              adminToken,
            })
          );
        }
      } catch (error: any) {
        console.error('에러발생');
        router.push('http://localhost:3002/login');
      }
    } else {
      dispatch(logout());
      console.error('토큰이 없습니다');
      router.push('http://localhost:3002/login');
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [dispatch, router]);

  if (isLoggedIn || adminToken) {
    return (
      <>
        <Header />
        <Template>
          <Component {...pageProps} />
        </Template>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Component {...pageProps} />
      </>
    );
  }
};
export default AppWrapper;

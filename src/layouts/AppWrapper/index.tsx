import Template from '@/layouts/Template';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setUser } from '@/utill/redux/slices/userSlice';
import { getUser } from '@/pages/api/userApi';
import Header from '@/features/Header';
import { RootState } from '@/utill/redux/store';

const AppWrapper = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      const adminToken = Cookies.get('adminToken');
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
        console.error('토큰이 없습니다');
        router.push('http://localhost:3002/login');
      }
    };
    fetchUserData();
  }, [dispatch, router]);

  // return (
  //   <>
  //     {isLoggedIn ? (
  //       <>
  //         <Header />
  //         <Template>
  //           <Component {...pageProps} />
  //         </Template>
  //       </>
  //     ) : (
  //       <>
  //         <Header />
  //         <Component {...pageProps} />
  //       </>
  //     )}
  //   </>
  // );

  // return (
  //   <>
  //     <Header />
  //     <Template>
  //       <Component {...pageProps} />
  //     </Template>
  //   </>
  // );

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <Component {...pageProps} />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Template>
          <Component {...pageProps} />
        </Template>
      </>
    );
  }

  //   return (
  //     <>
  //       <Header />
  //       {isLoginPage ? (
  //         <Component {...pageProps} />
  //       ) : (
  //         router.push('/login') // 로그인 페이지로 리다이렉트
  //       )}
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <Header />
  //     <Template>
  //       <Component {...pageProps} />
  //     </Template>
  //   </>
  // );
};
export default AppWrapper;

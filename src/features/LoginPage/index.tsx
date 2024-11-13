import InputField from '@/components/InputField';
import { LoginStyled } from '@/features/LoginPage/style';
import { Button, Form, message } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { postLogin } from '@/pages/api/userApi';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginSuccess } from '@/utill/redux/slices/userSlice';
import { AxiosError } from 'axios'; // AxiosError 타입을 import
import { LoginData } from '@/types';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleLogin = async (values: LoginData) => {
    const { email, password } = values;
    try {
      const response = await postLogin({ email, password });
      // console.log(response, 'response');
      if (response.token) {
        setEmailError(null);
        setPasswordError(null);
        Cookies.set('adminToken', response.token, { expires: 1 });
        message.success('로그인 성공');
        dispatch(
          loginSuccess({
            email: response.data.email,
            name: response.data.name,
            role: response.data.role,
            adminToken: response.token,
          })
        );
        router.push('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError; // error를 AxiosError로 캐스팅

      if (axiosError.response && axiosError.response.status === 404) {
        setEmailError('존재하지 않는 회원입니다.');
        message.error('존재하지 않는 회원입니다.');
      } else if (axiosError.response && axiosError.response.status === 401) {
        setPasswordError('비밀번호가 틀렸습니다');
        message.error('비밀번호를 확인해주세요.');
      } else {
        message.error('로그인에 실패했습니다.');
      }
    }
  };
  return (
    <LoginStyled>
      <Form
        name="signup"
        className="form"
        onFinish={handleLogin}
        initialValues={{
          email: 'admin@daum.net', // 기본값으로 설정할 이메일
          password: 'password1234!', // 기본값으로 설정할 비밀번호
        }}
      >
        <div className="formLogo">
          <div className="logo">ChancePace</div>
          <div className="title">관리자</div>
        </div>
        <InputField
          name="email"
          label="email"
          rules={[
            { required: true, message: '아이디를 입력해주세요' },
            {
              validator: () => (emailError ? Promise.reject(new Error(emailError)) : Promise.resolve()),
            },
          ]}
        ></InputField>
        <InputField
          name="password"
          label="비밀번호"
          rules={[
            { required: true, message: '비밀번호를 입력해주세요' },
            {
              validator: () => (passwordError ? Promise.reject(new Error(passwordError)) : Promise.resolve()),
            },
          ]}
          isPassword
        ></InputField>

        <Button htmlType="submit">로그인</Button>
        <div>
          <Link href="/signup" passHref>
            <span className="span1">아직 회원이 아니신가요?</span>
          </Link>
          <Link href="/signup" passHref>
            <span>아이디/비밀번호 찾기</span>
          </Link>
        </div>
      </Form>
    </LoginStyled>
  );
};
export default LoginPage;

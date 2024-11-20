import { SignupFormStyled } from './styled';
import { Form, message, FormInstance, Button } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/components/InputField';
import { postSignup } from '@/pages/api/userApi';
import { RuleObject } from 'antd/es/form';
import { AxiosError } from 'axios';
import { SignupData } from '@/types';

const SignupPage = () => {
  const router = useRouter();
  const [duplicateError, setDuplicateError] = useState('');

  const handleSignup = async (values: SignupData) => {
    const { email, password, adminSecretKey } = values;
    const agreed = true;
    const role = 'admin';
    try {
      const response = await postSignup({
        email,
        password,
        role,
        agreed,
        adminSecretKey,
      });
      router.push('/login');
      message.success('회원가입 성공!');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        setDuplicateError('이미 존재하는 아이디입니다.');
        message.error('이미 존재하는 아이디입니다.');
      } else {
        message.error('회원가입 실패');
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // 유효성 검사 실패 시, message로 에러 메시지를 띄움
    if (errorInfo.errorFields.length > 0) {
      // 각 필드별로도 오류 메시지를 표시할 수 있음
      message.error(errorInfo.errorFields[0].errors[0]);
    }
  };

  return (
    <SignupFormStyled>
      <p className="formLogo">CHAN'SPACE</p>
      <Form
        name="signup"
        className="form"
        onFinishFailed={onFinishFailed}
        onFinish={handleSignup}
        initialValues={{
          email: 'admin@daum.net',
          password: 'password1234!',
          confirm: 'password1234!',
          adminSecretKey: '1234',
        }}
      >
        <InputField
          name="email"
          label="이메일"
          rules={[
            { required: true, message: '이메일을 입력해주세요' },
            {
              type: 'email',
              message: '메일주소가 유효하지 않습니다',
            },
            {
              validator: async () => {
                if (duplicateError) {
                  return Promise.reject(new Error(duplicateError));
                }
                return Promise.resolve();
              },
            },
          ]}
        />
        <InputField
          name="password"
          label="비밀번호"
          rules={[
            {
              validator: (_, value) => {
                if (!value) return Promise.reject(new Error('비밀번호를 입력해주세요'));
                if (value.length < 10 || value.length > 15) {
                  return Promise.reject(new Error('비밀번호는 10자 이상 15자 이하로 설정해야 합니다.'));
                }
                if (!/[a-zA-Z]/.test(value)) {
                  return Promise.reject(new Error('비밀번호에 영문자를 하나 이상 포함시켜야 합니다.'));
                }
                if (!/\d/.test(value)) {
                  return Promise.reject(new Error('비밀번호에 숫자를 하나 이상 포함시켜야 합니다.'));
                }
                if (!/[!@#$%^&*]/.test(value)) {
                  return Promise.reject(new Error('비밀번호에 특수문자를 하나 이상 포함시켜야 합니다.'));
                }
                return Promise.resolve();
              },
            },
          ]}
          isPassword
        />
        <InputField
          name="confirm"
          label="비밀번호 확인"
          // password필드의 값에 의존한다는 뜻
          dependencies={['password']}
          rules={[
            { required: true, message: '비밀번호 확인을 입력해주세요' },
            ({ getFieldValue }: { getFieldValue: FormInstance['getFieldValue'] }) => ({
              validator(_: RuleObject, value: string) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
              },
            }),
          ]}
          isPassword
        />
        <InputField
          name="adminSecretKey"
          label="관리자키"
          rules={[{ required: true, message: '관리자 키를 입력해주세요' }]}
          isPassword
        />
        <Form.Item>
          <Button htmlType="submit">회원가입</Button>
        </Form.Item>
      </Form>
    </SignupFormStyled>
  );
};

export default SignupPage;

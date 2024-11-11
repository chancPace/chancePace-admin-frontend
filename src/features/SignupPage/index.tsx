import { SignupFormStyled } from './styled';
import { Form, message, FormInstance, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/components/InputField';
import CheckboxGroup from '@/components/CheckboxGroup';
import { postSignup } from '@/pages/api/userApi';
import { RuleObject } from 'antd/es/form';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { AxiosError } from 'axios'; // AxiosError 타입을 import
import { SignupData } from '@/types';

interface CheckBoxItem {
  value: string;
  children: string;
  checked: boolean;
  required: boolean;
}

const SignupPage = () => {
  const router = useRouter(); // useRouter 훅 가져오기
  //체크박스의 정보를 담고 있는 상태 배열
  const [smallCheckBoxs, setSmallCheckBoxs] = useState<CheckBoxItem[]>([
    {
      value: 'check1', //체크박스 고유값
      children: '서비스 이용 약관(필수)', //체크박스 옆에 표시될 텍스트
      checked: false, //체크박스가 선택되었는지
      required: true, //해당 체크박스 선택이 필수인지 구분
    },
    {
      value: 'check2',
      children: '개인정보 수집 이용 (필수)',
      checked: false,
      required: true,
    },
    {
      value: 'check3',
      children: '마케팅 정보 수신 동의 (선택)',
      checked: false,
      required: false,
    },
  ]);

  //모든 체크박스가 선택되었는지
  const [isAllChecked, setIsAllChecked] = useState(false);
  //필수 체크박스가 선택되지 않았을 경우의 에러 메세지
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태 추가

  //전체 체크박스 선택
  const onAllCheck = (e: CheckboxChangeEvent) => {
    //체크박스 상태 가져오기
    const checked = e.target.checked;
    //체크박스의 상태 업데이트
    setIsAllChecked(checked);
    //모든 체크박스의 checked상태를 업데이트
    setSmallCheckBoxs(smallCheckBoxs.map((x) => ({ ...x, checked: checked })));
  };

  //개별 체크박스 선택
  const onSingleCheck = (e: CheckboxChangeEvent) => {
    //클릭한 체크박스의 값을 저장
    const targetValue = e.target.value;
    setSmallCheckBoxs(
      smallCheckBoxs.map((checkBox) =>
        targetValue === checkBox.value
          ? //해당 체크박스의 checked상태를 반전시킴
            { ...checkBox, checked: !checkBox.checked }
          : checkBox
      )
    );
  };

  //개별 체크박스가 변경될때마다 호출되어 모든 체크박스가 선택되면 전체 체크박스 상태를 업데이트
  //every(): 배열에 모든 요소가 특정 조건을 만족하는지 확인될때 사용
  useEffect(() => {
    setIsAllChecked(smallCheckBoxs.every((x) => x.checked));
  }, [smallCheckBoxs]);

  const [duplicateError, setDuplicateError] = useState('');
  //회원가입 처리 함수
  //values-> 폼 필드의 값들
  const handleSignup = async (values: SignupData) => {
    const { email, password, adminSecretKey } = values;
    const allChecked = smallCheckBoxs.every((checkbox) => {
      if (checkbox.required) {
        return checkbox.checked; // 필수 체크박스가 선택되어야 함
      }
      return true; // 선택이 필요 없는 체크박스는 무시
    });

    //필수 체크박스가 선택되지 않았을경우 에러 메세지
    if (!allChecked) {
      setErrorMessage('필수 항목을 동의해주세요');
      message.error('필수 항목을 선택하세요.');
      return;
    }
    //선택인 체크박스 중 하나라도 선택된게 있는지 확인
    const isOptionalChecked = smallCheckBoxs
      .filter((checkbox) => !checkbox.required)
      .some((checkbox) => checkbox.checked);
    const agreed = isOptionalChecked;
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
      // message.error('유효성 검사를 통과하지 못했습니다. 필드를 확인하세요.');

      // 각 필드별로도 오류 메시지를 표시할 수 있음
      message.error(errorInfo.errorFields[0].errors[0]);
    }
  };

  return (
    <SignupFormStyled>
      <p className="formLogo">ChancePace</p>
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
          <CheckboxGroup
            checkboxes={smallCheckBoxs}
            onAllCheck={onAllCheck}
            onSingleCheck={onSingleCheck}
            isAllChecked={isAllChecked}
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">회원가입</Button>
        </Form.Item>
      </Form>
    </SignupFormStyled>
  );
};

export default SignupPage;

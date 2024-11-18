import { postSignup, updateOneUser } from '@/pages/api/userApi';
import { optionProps } from '@/types';
import { Button, Input, message, Select } from 'antd';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { UserModalStyled } from './style';

const UserCreate = ({ setIsModalOpen, data, type, fetchUserData, fetchUsers }: optionProps) => {
  const [existingPassword, setExistingPassword] = useState<any>();

  const authOpt = [
    { value: 'USER', label: '사용자' },
    { value: 'HOST', label: '호스트' },
    { value: 'ADMIN', label: '관리자' },
  ];
  const bankOpt = [
    { value: 'KB', label: '국민은행' },
    { value: 'IBK', label: '기업은행' },
    { value: 'WOORI', label: '우리은행' },
    { value: 'NH', label: '농협은행' },
    { value: 'SHINHAN', label: '신한은행' },
    { value: 'HANA', label: '하나은행' },
    { value: 'CITI', label: '한국씨티은행' },
    { value: 'SC', label: 'SC제일은행' },
    { value: 'DGB', label: '대구은행' },
    { value: 'BNK', label: '부산은행' },
    { value: 'GJB', label: '광주은행' },
    { value: 'JB', label: '전북은행' },
    { value: 'KBN', label: '경남은행' },
    { value: 'Jeju', label: '제주은행' },
  ];

  const validate = (values: any) => {
    const errors: { [key: string]: string } = {};

    if (!values.userName) {
      errors.userName = '이름은 필수 입력 항목입니다.';
    } else if (values.userName.length < 2) {
      errors.userName = '이름은 최소 2글자 이상이어야 합니다.';
    } else if (/[a-zA-Z0-9]/.test(values.userName)) {
      errors.userName = '숫자와 영어는 입력하실 수없습니다.';
    }

    if (!values.email) {
      errors.email = '이메일은 필수 입력 항목입니다.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = '유효한 이메일을 입력해 주세요.';
    }

    if (values.phoneNumber && values.phoneNumber.replace(/\D/g, '').length !== 11) {
      errors.phoneNumber = '전화번호는 11자리 숫자만 입력 가능합니다.';
    }
    return errors;
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length === 11) {
      return cleaned.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
    }

    return phoneNumber;
  };

  useEffect(() => {
    if (type === 'edit' && data?.password) {
      setExistingPassword(data.password);
    }
  }, [type, data]);

  const userInfo = useFormik({
    initialValues: {
      userName: data?.userName || '',
      email: data?.email || '',
      password: '',
      phoneNumber: data?.phoneNumber || '',
      bankAccountName: data?.bankAccountName || '',
      bankAccountOwner: data?.bankAccountOwner || '',
      bankAccountNumber: data?.bankAccountNumber || '',
      role: data?.role || 'USER',
      adminSecretKey: data?.adminSecretKey,
      agreed: data?.agreed || true,
    },
    validate,
    onSubmit(values) {
      const formattedPhoneNumber = formatPhoneNumber(values.phoneNumber);
      const payload = {
        ...values,
        phoneNumber: formattedPhoneNumber,
      };
      if (type === 'register') {
        postSignup({ ...payload, password: 'password1234!' })
          .then((response) => {
            fetchUsers();
            message.success('등록 성공');
          })
          .catch((error) => {
            if (error.message) {
              message.error(error.message);
            }
          });
      } else {
        const updatedPassword = values.password;
        const a = updateOneUser({ ...payload, id: data?.id, password: updatedPassword })
          .then((response) => {
            fetchUserData();
            message.success('수정 성공');
          })
          .catch((error) => {
            console.error('등록 실패', error);
            message.error('등록 실패');
          });
      }
      setIsModalOpen(false);
    },
  });

  return (
    <UserModalStyled>
      <form onSubmit={userInfo.handleSubmit} className="form">
        <div className="inputForm">
          <div>이름</div>
          <Input
            placeholder="이름을 입력해 주세요."
            name="userName"
            onChange={userInfo.handleChange}
            value={userInfo.values.userName}
          />
          {userInfo.errors.userName && userInfo.touched.userName && (
            <div style={{ color: 'red' }}>{userInfo.errors.userName}</div>
          )}
        </div>
        {type === 'register' ? (
          <div className="inputForm">
            <div>이메일</div>
            <Input
              placeholder="이메일 입력해 주세요."
              name="email"
              onChange={userInfo.handleChange}
              value={userInfo.values.email}
            />
            {userInfo.errors.email && userInfo.touched.email && (
              <div style={{ color: 'red' }}>{userInfo.errors.email}</div>
            )}
          </div>
        ) : (
          <></>
        )}

        {type === 'edit' ? (
          <div className="inputForm">
            <div>비밀번호</div>
            <Input
              placeholder="비밀번호 입력해 주세요."
              name="password"
              onChange={userInfo.handleChange}
              value={userInfo.values.password}
            />
          </div>
        ) : (
          <></>
        )}

        <div className="selectForm">
          <div className="auth">
            <div className="authLabel">권한</div>
            <Select
              className="input"
              options={authOpt}
              defaultValue={'USER'}
              value={userInfo.values.role}
              onChange={(value) => userInfo.setFieldValue('role', value)}
            />
            {userInfo.errors.role && userInfo.touched.role && (
              <div style={{ color: 'red' }}>{userInfo.errors.role}</div>
            )}
          </div>
        </div>
        <div className="inputForm">
          <div>전화번호</div>
          <Input
            placeholder="전화번호 입력해 주세요."
            name="phoneNumber"
            onChange={userInfo.handleChange}
            value={userInfo.values.phoneNumber}
          />
          {userInfo.errors.phoneNumber && userInfo.touched.phoneNumber && (
            <div style={{ color: 'red' }}>{userInfo.errors.phoneNumber}</div>
          )}
        </div>
        <div className="inputForm">
          <div>은행명</div>
          <Select
            className="input"
            placeholder="은행을 선택하세요."
            options={bankOpt}
            onChange={(value) => userInfo.setFieldValue('bankAccountName', value)}
            value={userInfo.values.bankAccountName}
          />
        </div>
        <div className="inputForm">
          <div>계좌 소유주</div>
          <Input
            placeholder="계좌 소유주를 입력하세요."
            name="bankAccountOwner"
            onChange={userInfo.handleChange}
            value={userInfo.values.bankAccountOwner}
          />
        </div>
        <div className="inputForm">
          <div>계좌 번호</div>
          <Input
            placeholder="계좌 번호를 입력하세요."
            name="bankAccountNumber"
            onChange={userInfo.handleChange}
            value={userInfo.values.bankAccountNumber}
          />
        </div>
        <div className="btn">
          <Button htmlType="submit">{type === 'register' ? '등록' : '수정'}</Button>
        </div>
      </form>
    </UserModalStyled>
  );
};
export default UserCreate;

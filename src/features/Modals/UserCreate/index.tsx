import { postSignup, updateOneUser } from '@/pages/api/userApi';
import { Button, Input, message, Select } from 'antd';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

interface optionProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  data?: any;
  type: string;
  fetchUserData?: any;
  fetchUsers?: any;
}

const UserCreate = ({ isModalOpen, setIsModalOpen, data, type, fetchUserData, fetchUsers }: optionProps) => {
  //  선택한 옵션 저장
  const [isAdminSelect, setIsAdminSelect] = useState(false);

  const genderOpt = [
    { value: 'MALE', label: '남성' },
    { value: 'FEMALE', label: '여성' },
  ];
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

  const userInfo = useFormik({
    initialValues: {
      userName: '',
      gender: '',
      email: '',
      password: '',
      phoneNumber: '',
      bankAccountName: '',
      bankAccountOwner: '',
      bankAccountNumber: '',
      role: '',
      adminSecretKey: '',
      agreed: true,
    },
    onSubmit(values) {
      console.log('🚀 ~ onSubmit ~ values:', values);
      const updatedData = { ...values, id: data?.id };
      if (type === 'register') {
        postSignup(values)
          .then((response) => {
            console.log(response);
            fetchUsers();
            message.success('등록 성공');
          })
          .catch((error) => {
            console.log('🚀 ~ onSubmit ~ error:', error);
            message.error('등록 실패', error);
          });
      } else {
        updateOneUser(updatedData)
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

  const handleRoleChange = (value: string) => {
    userInfo.setFieldValue('role', value);
    if (value === 'ADMIN') {
      setIsAdminSelect(true);
    } else {
      setIsAdminSelect(false);
    }
  };

  useEffect(() => {
    if (type === 'register') {
      userInfo.setFieldValue('userName', '');
      userInfo.setFieldValue('gender', '');
      userInfo.setFieldValue('email', '');
      userInfo.setFieldValue('password', '');
      userInfo.setFieldValue('phoneNumber', '');
      userInfo.setFieldValue('bankAccountName', '');
      userInfo.setFieldValue('bankAccountOwner', '');
      userInfo.setFieldValue('bankAccountNumber', '');
      userInfo.setFieldValue('role', '');
    } else {
      userInfo.setFieldValue('userName', data?.userName);
      userInfo.setFieldValue('gender', data?.gender);
      userInfo.setFieldValue('email', data?.email);
      userInfo.setFieldValue('phoneNumber', data?.phoneNumber);
      userInfo.setFieldValue('bankAccountName', data?.bankAccountName);
      userInfo.setFieldValue('bankAccountOwner', data?.bankAccountOwner);
      userInfo.setFieldValue('bankAccountNumber', data?.bankAccountNumber);
      userInfo.setFieldValue('role', data?.role);
    }
  }, [isModalOpen, type]);

  return (
    <>
      <form onSubmit={userInfo.handleSubmit}>
        <div className="inputForm">
          <div>이름</div>
          <Input
            required
            placeholder="이름을 입력해 주세요."
            name="userName"
            onChange={userInfo.handleChange}
            value={userInfo.values.userName}
          />
        </div>
        {type === 'register' ? (
          <div className="inputForm">
            <div>이메일</div>
            <Input
              required
              placeholder="이메일 입력해 주세요."
              name="email"
              onChange={userInfo.handleChange}
              value={userInfo.values.email}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="inputForm">
          <div>비밀번호</div>
          <Input
            required
            placeholder="비밀번호 입력해 주세요."
            name="password"
            onChange={userInfo.handleChange}
            value={userInfo.values.password}
          />
        </div>
        <div className="selectForm">
          <div className="gender">
            <div className="genderLabel">성별</div>
            <Select
              style={{ width: 80 }}
              options={genderOpt}
              value={userInfo.values.gender}
              onChange={(value) => userInfo.setFieldValue('gender', value)}
            />
          </div>
          <div className="auth">
            <div className="authLabel">권한</div>
            <Select style={{ width: 80 }} options={authOpt} value={userInfo.values.role} onChange={handleRoleChange} />
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
        </div>
        <div className="inputForm">
          <div>은행명</div>
          <Select
            style={{ width: 100 }}
            options={bankOpt}
            onChange={(value) => userInfo.setFieldValue('bankAccountName', value)}
            value={userInfo.values.bankAccountName}
          />
        </div>
        <div className="inputForm">
          <div>계좌 소유주</div>
          <Input
            placeholder="계좌 소유주 입력해 주세요."
            name="bankAccountOwner"
            onChange={userInfo.handleChange}
            value={userInfo.values.bankAccountOwner}
          />
        </div>
        <div className="inputForm">
          <div>계좌 번호</div>
          <Input
            placeholder="계좌 번호 입력해 주세요."
            name="bankAccountNumber"
            onChange={userInfo.handleChange}
            value={userInfo.values.bankAccountNumber}
          />
        </div>
        {isAdminSelect ? (
          <div className="inputForm">
            <div>관리자 키</div>
            <Input
              placeholder="관리자 키 입력해 주세요."
              name="adminSecretKey"
              onChange={userInfo.handleChange}
              value={userInfo.values.adminSecretKey}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="btn">
          <Button htmlType="submit">{type === 'register' ? '등록' : '수정'}</Button>
        </div>
      </form>
    </>
  );
};
export default UserCreate;

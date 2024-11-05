import { useRouter } from 'next/router';
import { Badge, Button, Descriptions, Modal, Space, Switch, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getOneUser, updateOneUser } from '@/pages/api/userApi';
import { CloseCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import UserDetailStyled from './style';
import UserCreate from '../Modals/UserCreate';
import { User } from '@/types';

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const userId = Number(id);
  const [data, setData] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await getOneUser({ userId });
      const result = response.data.data;
      console.log('🚀 ~ fetchUserData ~ result:', result);
      if (result) {
        // lastLogin과 createdAt 변환
        result.lastLogin = result.lastLogin ? result.lastLogin.split('T')[0] : '';
        result.createdAt = result.createdAt ? result.createdAt.split('T')[0] : '';
        setData(result);
      }
    } catch (error) {
      console.log('유저1명', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const items = [
    {
      key: '1',
      label: '이름',
      children: data?.userName,
    },
    {
      key: '2',
      label: '이메일',
      children: data?.email,
    },
    {
      key: '3',
      label: '전화번호',
      children: data?.phoneNumber,
    },
    {
      key: '4',
      label: '성별',
      children: data?.gender,
    },
    {
      key: '5',
      label: '계좌 정보',
      children: (
        <>
          <span style={{ display: 'inline-block', marginRight: 30 }}>{data?.bankAccountName}</span>
          <span style={{ display: 'inline-block', marginRight: 30 }}> {data?.bankAccountNumber}</span>
          <span style={{ display: 'inline-block' }}>{data?.bankAccountOwner}</span>
        </>
      ),
      span: 3,
    },
    {
      key: '6',
      label: '가입일자',
      children: data?.createdAt,
    },
    {
      key: '7',
      label: '최근 로그인',
      children: data?.lastLogin,
    },
    {
      key: '8',
      label: '회원 분류',
      children:
        data?.role === 'USER' ? (
          <Tag color="orange">사용자</Tag>
        ) : data?.role === 'HOST' ? (
          <Tag color="green">호스트</Tag>
        ) : (
          <Tag color="purple">관리자</Tag>
        ),
    },

    {
      key: '9',
      label: '회원 활성상태',
      children:
        data?.accountStatus === 'BLACKLISTED' ? (
          <Tag icon={<MinusCircleOutlined />} color="default">
            블랙리스트
          </Tag>
        ) : data?.accountStatus === 'WITHDRAWN' ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            탈퇴
          </Tag>
        ) : (
          <Tag icon={<SyncOutlined spin />} color="processing">
            활성
          </Tag>
        ),
    },
    {
      key: '10',
      label: '멤버쉽 현황',
      children: data?.membership ? <Badge status="processing" text="이용" /> : <Badge status="default" text="미사용" />,
    },
    {
      key: '11',
      label: '마케팅 수신여부',
      children: data?.isMarketingAgreed ? (
        <Badge status="processing" text="동의" />
      ) : (
        <Badge status="default" text="미동의" />
      ),
    },
  ];

  return (
    <UserDetailStyled>
      <p>회원 정보</p>
      <Button
        htmlType="submit"
        className="edit"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        수정
      </Button>
      <Button
        className="delete"
        onClick={() => {
          // const updatedData = { ...data, accountStatus: 'WITHDRAWN' }; // 원하는 상태 값으로 변경
          updateOneUser({ ...data, accountStatus: 'WITHDRAWN' });
          fetchUserData();
        }}
      >
        삭제
      </Button>
      <Button
        className="delete"
        onClick={() => {
          // const updatedData:any = { ...data, accountStatus: 'BLACKLISTED' }; // 원하는 상태 값으로 변경
          updateOneUser({ ...data, accountStatus: 'BLACKLISTED' });
          fetchUserData();
        }}
      >
        블랙리스트
      </Button>
      <Modal
        width={400}
        title="회원 정보 수정"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        className="modal"
      >
        <UserCreate
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={data}
          type={'edit'}
          fetchUserData={fetchUserData}
        />
      </Modal>
      <Descriptions bordered items={items} />
    </UserDetailStyled>
  );
};

export default UserDetail;

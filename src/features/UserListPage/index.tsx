import TableComponent from '@/components/tables';
import { getAllUser } from '@/pages/api/userApi';
import { CloseCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import router from 'next/router';
import { useEffect, useState } from 'react';

const UserListPage = () => {
  const [data, setData] = useState();

  const fetchUsers = async () => {
    try {
      const response = await getAllUser();
      const result = response.data.data;
      result.map((x: any, i: number) => {
        x.lastLogin = x?.lastLogin.split('T')[0];
        x.createdAt = x?.createdAt.split('T')[0];
      });

      setData(result);
    } catch (error) {
      console.error('오류!!:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: '성함',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '성별',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (gender === 'MALE' ? '남성' : '여성'),
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '전화번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    // {
    //   title: '계좌번호',
    //   dataIndex: 'hostBankAccount',
    //   key: 'hostBankAccount',
    // },
    // {
    //   title: '등급',
    //   dataIndex: 'ranking',
    //   key: 'ranking',
    // },
    {
      title: '계정상태',
      dataIndex: 'accountStatus',
      key: 'accountStatus',
      render: (status: string) =>
        status === 'ACTIVE' ? (
          <Tag icon={<SyncOutlined spin />} color="processing">
            활성
          </Tag>
        ) : status === 'BLACKLISTED' ? (
          <Tag icon={<MinusCircleOutlined />} color="default">
            블랙리스트
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            탈퇴
          </Tag>
        ),
    },
    {
      title: '권한',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) =>
        role === 'USER' ? (
          <Tag color="orange">사용자</Tag>
        ) : role === 'HOST' ? (
          <Tag color="green">호스트</Tag>
        ) : (
          <Tag color="purple">관리자</Tag>
        ),
    },
    {
      title: '마케팅동의',
      dataIndex: 'isMarketingAgreed',
      key: 'isMarketingAgreed',
      render: (agree: boolean) => (agree ? <Tag color="blue">동의</Tag> : <Tag color="red">미동의</Tag>),
    },
    {
      title: '최근 로그인',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: '가입일',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  return (
    <>
      <p>회원 조회</p>
      <Button type="primary">등록</Button>

      <Table
        columns={columns}
        dataSource={data}
        onRow={(record: any, rowIndex) => {
          return {
            onClick: (e) => {
              e.preventDefault();
              console.log(record.userName, 'record');
              console.log(rowIndex, 'id');
              router.push(`/user/userlist/userdetail/${record.userName}`);
            },
          };
        }}
      />
    </>
  );
};
export default UserListPage;

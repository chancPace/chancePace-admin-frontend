import { getAllUser, postSignup, searchUser } from '@/pages/api/userApi';
import { CloseCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Space, Table, Tag } from 'antd';
import { useFormik } from 'formik';
import router from 'next/router';
import { useEffect, useState } from 'react';
import UserListStyled from './style';
import UserCreate from '../Modals/UserCreate';
import CouponModal from '../Modals/Coupon';

const UserListPage = () => {
  const [data, setData] = useState([]);
  // const [allData, setAllData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [options, setOptions] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await getAllUser();
      const result = response.data.data;
      result?.map((x: any, i: number) => {
        x.lastLogin = x?.lastLogin?.split('T')[0];
        x.createdAt = x?.createdAt?.split('T')[0];
      });
      const dataWithKeys = result.map((item: any) => ({ ...item, key: item.id }));
      setData(dataWithKeys);
      // setAllData(dataWithKeys);
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
      filters: [
        { text: '남성', value: 'MALE' },
        { text: '여성', value: 'FEMALE' },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => record.gender === value,
      render: (gender: string) => (gender === 'MALE' ? '남성' : gender === 'FEMALE' ? '여성' : ''),
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      sorter: (a?: any, b?: any) => a.email - b.email,
    },
    {
      title: '전화번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a?: any, b?: any) => Number(a.phoneNumber.replace(/-/g, '')) - Number(b.phoneNumber.replace(/-/g, '')),
    },
    {
      title: '계정상태',
      dataIndex: 'accountStatus',
      key: 'accountStatus',
      filters: [
        { text: '활성', value: 'ACTIVE' },
        { text: '블랙리스트', value: 'BLACKLISTED' },
        { text: '탈퇴', value: 'WITHDRAWN' },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => record.accountStatus === value,
      render: (status: string) =>
        status === 'BLACKLISTED' ? (
          <Tag icon={<MinusCircleOutlined />} color="default">
            블랙리스트
          </Tag>
        ) : status === 'WITHDRAWN' ? (
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
      title: '권한',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: '사용자', value: 'USER' },
        { text: '호스트', value: 'HOST' },
        { text: '관리자', value: 'ADMIN' },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => record.role === value,
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
      filters: [
        { text: '동의', value: true },
        { text: '미동의', value: false },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => record.isMarketingAgreed === value,
      render: (agree: boolean) => (agree ? <Tag color="blue">동의</Tag> : <Tag color="red">미동의</Tag>),
    },
    {
      title: '최근 로그인',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: (a?: any, b?: any) => Number(a.lastLogin.replace(/-/g, '')) - Number(b.lastLogin.replace(/-/g, '')),
    },
    {
      title: '가입일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a?: any, b?: any) => Number(a.createdAt.replace(/-/g, '')) - Number(b.createdAt.replace(/-/g, '')),
    },
  ];
  const user = useFormik({
    initialValues: {
      search: '',
    },
    async onSubmit(values) {
      const response = await searchUser(values.search);
      const select = response.data.data;
      select.map((x: any, i: number) => {
        x.lastLogin = x?.lastLogin?.split('T')[0];
        x.createdAt = x?.createdAt?.split('T')[0];
      });
      setData(select);
    },
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys);
      // 선택한 회원 담기
      const selectedUsers = data
        ?.filter((user: any) => selectedRowKeys.includes(user.key))
        ?.map((user: any) => ({
          value: user.id,
          label: user.userName, // 회원 이름
        }));
      setOptions(selectedUsers);
    },
  };
  console.log('🚀 ~ UserListPage ~ selectedUsers:', options);

  return (
    <UserListStyled>
      <p>회원 목록</p>
      <Button type="primary" className="register" onClick={() => setIsModalOpen(true)}>
        등록
      </Button>
      <Button type="primary" className="register" onClick={() => setIsCouponModalOpen(true)}>
        쿠폰 전송
      </Button>
      <form onSubmit={user.handleSubmit} className="form_wrap">
        <Input placeholder="이름, 이메일, 전화번호로 검색해 주세요." name="search" onChange={user.handleChange} />

        <Button htmlType="submit">조회</Button>
      </form>
      <Modal
        width={400}
        title="회원 등록"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        className="modal"
      >
        <UserCreate
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          type={'register'}
          fetchUsers={fetchUsers}
        />
      </Modal>
      <Modal
        width={400}
        title="쿠폰 발급"
        open={isCouponModalOpen}
        onOk={() => setIsCouponModalOpen(false)}
        onCancel={() => setIsCouponModalOpen(false)}
        footer={false}
        className="modal"
      >
        <CouponModal setIsModalOpen={setIsCouponModalOpen} type={'send'} data={data} options={options} />
      </Modal>

      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        onRow={(record: any) => {
          return {
            onClick: (e) => {
              e.preventDefault();
              router.push(`/user/userlist/userdetail/${record?.id}`);
            },
          };
        }}
      />
    </UserListStyled>
  );
};
export default UserListPage;

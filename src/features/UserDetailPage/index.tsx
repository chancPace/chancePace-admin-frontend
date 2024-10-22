import { useRouter } from 'next/router';
import { Badge, Button, Descriptions, Space, Switch } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useState } from 'react';
import TableComponent from '@/components/tables';

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [show, setShow] = useState(true);
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '이름',
      children: '홍길동',
    },
    {
      key: '2',
      label: '아이디',
      children: 'test@gmail.com',
    },
    {
      key: '3',
      label: '전화번호',
      children: '010-1234-5678',
    },
    {
      key: '4',
      label: '회원등급',
      children: 'platinum',
    },
    {
      key: '5',
      label: '가입일자',
      children: '2019-04-24 18:00:00',
    },
    {
      key: '6',
      label: '회원 분류',
      children: (
        <>
          <Badge color="pink" text="사용자" />
          <Badge color="blue" text="호스트" />
          <Badge color="black" text="관리자" />
        </>
      ),
    },
    {
      key: '7',
      label: '주소',
      children: '서울시 마포구 도화2길 53, 3층',
      span: 3,
    },
    {
      key: '8',
      label: '회원 활성상태',
      children: <Badge status="processing" text="이용중" />,
      //   (
      //   <Space>
      //     <Switch checked={show} onChange={() => setShow(!show)} />
      //     {show ? '활성 중' : '비활성화'}
      //   </Space>
      // ),
    },
    {
      key: '9',
      label: '멤버쉽 현황',
      children: <Badge status="processing" text="이용중" />,
    },
    {
      key: '10',
      label: '마케팅 수신여부',
      children: <Badge status="processing" text="동의" />,
    },
  ];

  const columns = [
    {
      title: '주문상태',
      dataIndex: 'orderstatus',
      key: 'orderstatus',
    },
    {
      title: '공간명',
      dataIndex: 'spacename',
      key: 'spacename',
    },
    {
      title: '주문번호',
      dataIndex: 'ordernum',
      key: 'ordernum',
    },
    {
      title: '이용일자',
      dataIndex: 'useday',
      key: 'useday',
    },
    {
      title: '결제일',
      key: 'payday',
      dataIndex: 'payday',
    },
    {
      title: '결제 금액',
      key: 'price',
      dataIndex: 'price',
    },
  ];
  const [dataSource, setData] = useState([
    {
      key: '1',
      orderstatus: '이용완료',
      spacename: '코딩온',
      ordernum: '123466704837',
      useday: '2024-10-21',
      payday: '2024-10-01',
      price: '123,400',
    },
  ]);

  return (
    <>
      <p>회원 정보</p>
      <Descriptions bordered items={items} extra={<Button type="primary">Edit</Button>} />
      <p>통합 주문 내역</p>
      <TableComponent columns={columns} dataSource={dataSource} />
    </>
  );
};

export default UserDetail;

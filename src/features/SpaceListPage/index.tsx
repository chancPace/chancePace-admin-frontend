import { CloseCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Input, Table, Tag } from 'antd';
import { useFormik } from 'formik';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { getAllSpace, searchSpace } from '@/pages/api/spaceAPI';
import SpaceListStyled from './style';
import Link from 'next/link';
import { Space } from '@/types';

const SpaceListPage = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const fetchSpace = async () => {
    try {
      const response = await getAllSpace();
      const result = response.data;
      result?.map((x: Space, i: number) => {
        x.createdAt = x?.createdAt?.split('T')[0];
      });
      const dataWithKeys = result.map((item: any) => ({ ...item, key: item.id }));
      setData(dataWithKeys);
    } catch (error) {
      console.error('오류!!:', error);
    }
  };
  useEffect(() => {
    fetchSpace();
  }, []);

  const detailPage = (data: number) => {
    router.push(`/space/spacelist/spacedetail/${data}`);
  };

  const columns = [
    {
      title: '공간명',
      dataIndex: 'spaceName',
      key: 'spaceName',
    },
    {
      title: '주소',
      dataIndex: 'spaceLocation',
      key: 'spaceLocation',
    },
    {
      title: '호스트명',
      dataIndex: 'spaceAdminName',
      key: 'spaceAdminName',
    },
    {
      title: '전화번호',
      dataIndex: 'spaceAdminPhoneNumber',
      key: 'spaceAdminPhoneNumber',
      sorter: (a?: any, b?: any) =>
        Number(a?.spaceAdminPhoneNumber?.replace(/-/g, '')) - Number(b?.spaceAdminPhoneNumber?.replace(/-/g, '')),
    },
    {
      title: '관리자 승인',
      dataIndex: 'spaceStatus',
      key: 'spaceStatus',
      filters: [
        { text: '승인', value: 'AVAILABLE' },
        { text: '미승인', value: 'UNAVAILABLE' },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => record.spaceStatus === value,
      render: (status: string) =>
        status === 'AVAILABLE' ? (
          <Tag icon={<SyncOutlined spin />} color="processing">
            승인
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            미승인
          </Tag>
        ),
    },
    {
      title: '운영',
      dataIndex: 'isOpen',
      key: 'isOpen',
      filters: [
        { text: '운영중', value: true },
        { text: '미운영', value: false },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => record.isOpen === value,
      render: (isOpen: boolean) => (isOpen ? <Tag color="blue">운영중</Tag> : <Tag color="red">미운영</Tag>),
    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a?: any, b?: any) => Number(a.createdAt.replace(/-/g, '')) - Number(b.createdAt.replace(/-/g, '')),
    },
    {
      title: '상세페이지',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => <a onClick={() => detailPage(record.key)}>상세 보기</a>,
    },
  ];

  const space = useFormik({
    initialValues: {
      search: '',
    },
    async onSubmit(values) {
      const response = await searchSpace(values.search);
      const select = response.data.data;
      select.map((x: Space, i: number) => {
        x.createdAt = x?.createdAt?.split('T')[0];
      });
      setData(select);
    },
  });

  // 테이블 체크박스
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <SpaceListStyled>
      <p>공간 목록</p>
      <Link href="spaceadd">
        <Button type="primary" className="register">
          등록
        </Button>
      </Link>
      <form onSubmit={space.handleSubmit} className="form_wrap">
        <Input placeholder="공간명, 주소, 호스트 명으로 검색해 주세요." name="search" onChange={space.handleChange} />
        <Button htmlType="submit">조회</Button>
      </form>
      <Table columns={columns} dataSource={data} rowSelection={rowSelection} />
    </SpaceListStyled>
  );
};
export default SpaceListPage;

import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useRouter } from 'next/router';

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  tags: string[];
}

const Tables = () => {
  const router = useRouter();
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '성함',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '아이디',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '전화번호',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '등급',
      dataIndex: 'ranking',
      key: 'ranking',
    },
    {
      title: '권한',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>호스트 전환</a>
          <a>탈퇴</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      email: 'test1@gmail.com',
      phone: '010-1234-5678',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      email: 'test2@gmail.com',
      phone: '010-4567-8910',
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      email: 'test3@gmail.com',
      phone: '010-9876-5432',
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      onRow={(record, rowIndex) => {
        return {
          onClick: (e) => {
            e.preventDefault();
            router.push('/user/userlist/userinfo/1');
          },
        };
      }}
    />
  );
};

export default Tables;

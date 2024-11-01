import { getAllSpace } from '@/pages/api/spaceApi';
import { Table } from 'antd';
import { useEffect, useState } from 'react';

const SpaceListPage = () => {
  const [data, setData] = useState();
  const columns = [
    { title: '공간명', dataIndex: 'spaceName', key: 'spaceName' },
    { title: '위치', dataIndex: 'spaceLocation', key: 'spaceLocation' },
    { title: '카테고리', dataIndex: 'category', key: 'category' },
    { title: '상태', dataIndex: 'spaceStatus', key: 'spaceStatus' },
    { title: '영업', dataIndex: 'isOpen', key: 'isOpen' },
  ];

  const fetchAllSpace = async () => {
    try {
      const response = await getAllSpace();
      const result = response.data.data;
      console.log('🚀 ~ fetchAllSpace ~ result:', result);
      setData(result);
    } catch (error) {}
  };
  useEffect(() => {
    fetchAllSpace();
  }, []);

  return (
    <>
      <p>공간 조회</p>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default SpaceListPage;

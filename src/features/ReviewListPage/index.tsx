import { getReview } from '@/pages/api/reviewApi';
import ReviewListStyle from './style';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import router from 'next/router';

const ReviewListPage = () => {
  const [data, setData] = useState();

  const fetchReview = async () => {
    const response = await getReview();
    console.log('🚀 ~ fetchReview ~ response:', response);
  };

  useEffect(() => {
    fetchReview();
  }, []);

  const detailPage = (data: number) => {
    router.push(`/review/reviewlist/reviewdetail/${data}`);
  };

  const columns = [
    {
      title: '공간명',
      dataIndex: 'spaceName',
      key: 'spaceName',
    },
    {
      title: '작성자',
      dataIndex: 'spaceName',
      key: 'spaceName',
    },
    {
      title: '평점',
      dataIndex: 'reviewRating',
      key: 'reviewRating',
    },
    {
      title: '내용',
      dataIndex: 'reviewComment',
      key: 'reviewComment',
    },
    {
      title: '작성일',
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

  return (
    <ReviewListStyle>
      <p>리뷰 목록</p>
      <Table columns={columns} dataSource={data} />
    </ReviewListStyle>
  );
};
export default ReviewListPage;

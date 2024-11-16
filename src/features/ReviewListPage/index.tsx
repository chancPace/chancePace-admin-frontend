import { getAllReview, getReview } from '@/pages/api/reviewApi';
import ReviewListStyle from './style';
import { useEffect, useState } from 'react';
import { Rate, Table } from 'antd';
import router from 'next/router';
import dayjs from 'dayjs';

const ReviewListPage = () => {
  const [data, setData] = useState();

  const fetchReview = async () => {
    const response = await getAllReview();
    const transformedReviews = response.data.flatMap((x: any) => {
      return {
        key: x.id,
        reviewComment: x.reviewComment,
        reviewRating: x.reviewRating,
        reviewStatus: x.reviewStatus,
        createdAt: x.createdAt,
        spaceName: x.space?.spaceName,
        spaceLocation: x.space?.spaceLocation,
        spacePrice: x.space?.spacePrice,
        spaceAdminName: x.space?.spaceAdminName,
        reviewerName: x.user?.userName,
        reviewerEmail: x.user?.email,
      };
    });
    setData(transformedReviews);
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
      dataIndex: 'reviewerName',
      key: 'reviewerName',
    },
    {
      title: '내용',
      dataIndex: 'reviewComment',
      key: 'reviewComment',
    },
    {
      title: '평점',
      dataIndex: 'reviewRating',
      key: 'reviewRating',
      filters: [
        { text: '1점', value: 1 },
        { text: '2점', value: 2 },
        { text: '3점', value: 3 },
        { text: '4점', value: 4 },
        { text: '5점', value: 5 },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => Number(record.reviewRating) == value,
      render: (value: number) => <Rate disabled value={value} />,
      sorter: (a: any, b: any) => Number(a.reviewRating) - Number(b.reviewRating),
    },
    {
      title: '작성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: Date) => dayjs(createdAt).format('YYYY-MM-DD'),
      sorter: (a?: any, b?: any) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
    },
    {
      title: '상세 페이지',
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

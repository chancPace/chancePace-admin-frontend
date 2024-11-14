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
    console.log('🚀 ~ fetchReview ~ response:', response);
    const transformedReviews = response.data.flatMap((x: any) => {
      return {
        key: x.id, // 유니크한 키값
        reviewComment: x.reviewComment,
        reviewRating: x.reviewRating,
        reviewStatus: x.reviewStatus,
        createdAt: x.createdAt,
        spaceName: x.space?.spaceName, // spaceName (호스트)
        spaceLocation: x.space?.spaceLocation, // spaceLocation (위치)
        spacePrice: x.space?.spacePrice, // 공간 가격
        spaceAdminName: x.space?.spaceAdminName, // 관리자 이름
        reviewerName: x.user?.userName, // 작성자 이름
        reviewerEmail: x.user?.email, // 작성자 이메일
      };
    });
    console.log('🚀 ~ transformedReviews ~ transformedReviews:', transformedReviews);
    setData(transformedReviews);
    // setData(response.data);
    console.log('🚀 ~ fetchReview ~ data:', data);
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
      title: '평점',
      dataIndex: 'reviewRating',
      key: 'reviewRating',
      render: (value: number) => <Rate disabled value={value} />,
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
      render: (createdAt: Date) => dayjs(createdAt).format('YYYY-MM-DD'),
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

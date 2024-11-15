import { useRouter } from 'next/router';
import { Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ReviewDetailStyle from './style';
import { getOneReview } from '@/pages/api/reviewApi';

const ReviewDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const reviewId = Number(id);
  const [data, setData] = useState<any>();

  const fetchReviewData = async () => {
    if (reviewId) {
      try {
        const response = await getOneReview(reviewId);
        const result = response.data;
        setData(result);
      } catch (error) {
        console.log('리뷰', error);
      }
    }
  };
  useEffect(() => {
    fetchReviewData();
  }, [reviewId]);

  const items = [
    {
      key: '1',
      label: '공간명',
      children: data?.space?.spaceName,
    },
    {
      key: '2',
      label: '공간 위치',
      children: data?.space?.spaceLocation,
    },
    {
      key: '3',
      label: '리뷰 작성자',
      children: data?.user?.userName,
    },
    {
      key: '4',
      label: '리뷰 내용',
      children: data?.reviewComment,
    },
    {
      key: '5',
      label: '별점',
      children: data?.reviewRating,
    },
    {
      key: '6',
      label: '작성일자',
      children: `${dayjs(data?.createdAt).format('YYYY-MM-DD')}`,
    },
  ];

  return (
    <ReviewDetailStyle>
      <p>리뷰 상세 정보</p>
      <Descriptions bordered items={items} />
    </ReviewDetailStyle>
  );
};

export default ReviewDetailPage;

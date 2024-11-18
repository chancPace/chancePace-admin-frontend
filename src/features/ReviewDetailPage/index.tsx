import { useRouter } from 'next/router';
import { Button, Descriptions, message, Modal, Rate } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ReviewDetailStyle from './style';
import { getOneReview, updateRatingBySpace, updateReview } from '@/pages/api/reviewApi';

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
      children: <Rate disabled value={data?.reviewRating} />,
    },
    {
      key: '6',
      label: '작성일자',
      children: `${dayjs(data?.createdAt).format('YYYY-MM-DD')}`,
    },
  ];
  const handleDeleteClick = async () => {
    const reviewData = {
      reviewId,
      reviewComment: data.reviewComment,
      reviewRating: null,
      reviewStatus: 'UNAVAILABLE',
    };
    try {
      const result = await updateReview(reviewId, reviewData);
      if (result) {
        message.success('리뷰가 성공적으로 삭제되었습니다.');
        const updateResult = await updateRatingBySpace(data.spaceId);
        router.push('/review/reviewlist');
      }
    } catch (error) {
      message.error('리뷰 삭제에 실패했습니다.');
    }
  };
  return (
    <ReviewDetailStyle>
      <div className="top">
        <p>리뷰 상세 정보</p>
        {data?.reviewStatus === 'AVAILABLE' ? (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '리뷰를 삭제하겠습니까?',
                okText: '확인',
                cancelText: '취소',
                onOk: () => {
                  handleDeleteClick();
                },
              });
            }}
          >
            삭제
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Descriptions bordered items={items} />
    </ReviewDetailStyle>
  );
};

export default ReviewDetailPage;

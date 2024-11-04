import { useRouter } from 'next/router';
import { Badge, Button, Descriptions, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { updateOneUser } from '@/pages/api/userApi';
import CouponDetailStyled from './style';
import CouponModal from '../Modals/Coupon';
import { getOneCoupon, updateCoupon } from '@/pages/api/couponApi';

const CouponDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const couponId = Number(id);
  const [data, setData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [type, setType] = useState('');

  const fetchCouponData = async (couponId: number) => {
    try {
      const response = await getOneCoupon(couponId);
      const result = response.data;
      if (result) {
        result.createdAt = result.createdAt ? result.createdAt.split('T')[0] : '';
        setData(result);
      }
    } catch (error) {
      console.log('쿠폰 상세', error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchCouponData(couponId);
    }
  }, [id]);

  const items = [
    {
      key: '1',
      label: '쿠폰명',
      children: data?.couponName,
    },
    {
      key: '2',
      label: '쿠폰코드',
      children: data?.couponCode,
    },
    {
      key: '3',
      label: '할인 가격',
      children: data?.discountPrice,
    },
    {
      key: '4',
      label: '상태',
      children: data?.isActive ? <Badge status="processing" text="활성" /> : <Badge status="default" text="비활성" />,
    },
    {
      key: '5',
      label: '생성일',
      children: data?.createdAt,
    },
  ];

  return (
    <CouponDetailStyled>
      <p>쿠폰 정보</p>
      <Button
        htmlType="submit"
        className="edit"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        수정
      </Button>
      <Button
        className="delete"
        onClick={() => {
          const updatedData = { couponId, isActive: false }; // 원하는 상태 값으로 변경
          updateCoupon(updatedData);
          fetchCouponData(couponId);
        }}
      >
        삭제
      </Button>
      <Modal
        width={400}
        title="쿠폰 정보 수정"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        className="modal"
      >
        <CouponModal setIsModalOpen={setIsModalOpen} type={'fix'} data={data} couponId={couponId} />
      </Modal>
      <Descriptions bordered items={items} />
    </CouponDetailStyled>
  );
};

export default CouponDetailPage;

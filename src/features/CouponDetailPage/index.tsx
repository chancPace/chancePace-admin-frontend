import { useRouter } from 'next/router';
import { Badge, Button, Descriptions, message, Modal, Tag } from 'antd';
import { useEffect, useState } from 'react';
import CouponDetailStyled from './style';
import CouponModal from '../Modals/Coupon';
import { getOneCoupon, updateCoupon } from '@/pages/api/couponApi';
import { CouponData } from '@/types';

const CouponDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const couponId = Number(id);
  const [data, setData] = useState<CouponData>();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      span: 2,
    },
    {
      key: '2',
      label: '할인 가격',
      children: `${data?.discountPrice?.toLocaleString()}원`,
      span: 2,
    },
    {
      key: '3',
      label: '생성일',
      children: data?.createdAt,
      span: 2,
    },
    {
      key: '4',
      label: '상태',
      children: data?.isActive ? <Tag color="blue">활성</Tag> : <Tag color="red">비활성</Tag>,
      span: 2,
    },
  ];

  return (
    <CouponDetailStyled>
      <div className="top">
        <p>쿠폰 상세 정보</p>
        <div>
          {data?.isActive === true ? (
            <div className="button_wrap">
              <Button
                htmlType="submit"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                수정
              </Button>
              <Button
                onClick={() => {
                  Modal.confirm({
                    title: '쿠폰을 삭제하시겠습니까?',
                    okText: '확인',
                    cancelText: '취소',
                    onOk: async () => {
                      message.info('삭제되었습니다.');
                      const updatedData = { couponId, isActive: false };
                      updateCoupon(updatedData);
                      router.push('/coupon/couponlist');
                    },
                  });
                }}
              >
                삭제
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Modal
        width={400}
        title="쿠폰 정보 수정"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        className="modal"
      >
        <CouponModal
          setIsModalOpen={setIsModalOpen}
          type={'fix'}
          data={data}
          couponId={couponId}
          fetchCoupons={fetchCouponData}
        />
      </Modal>
      <Descriptions bordered items={items} />
    </CouponDetailStyled>
  );
};

export default CouponDetailPage;

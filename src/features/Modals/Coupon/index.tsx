import { useFormik } from 'formik';
import { Button, DatePicker, Input, message, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { CouponModalStyled } from './style';
import { addCoupon, getAllCoupon, sendCoupon, updateCoupon } from '@/pages/api/couponApi';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { CouponData } from '@/types';

interface CouponProps {
  setIsModalOpen: any;
  type?: string;
  data?: any;
  options?: any;
  fetchCoupons?: any;
  couponId?: number;
}

const CouponModal = ({ setIsModalOpen, type, data, options, fetchCoupons, couponId }: CouponProps) => {
  const [coupons, setCoupons] = useState();
  const router = useRouter();

  const fetchCouponList = async () => {
    try {
      const response = await getAllCoupon();
      const result = response.data;
      const active = result
        ?.filter((coupon: CouponData) => coupon.isActive)
        .map((coupon: CouponData) => ({
          label: coupon.couponName,
          value: coupon.id,
        }));
      setCoupons(active);
    } catch (error) {
      console.error('오류!!:', error);
    }
  };
  useEffect(() => {
    if (type === 'send') {
      fetchCouponList();
    }
  }, [type]);

  const coupon = useFormik({
    initialValues: {
      couponName: data?.couponName || '',
      discountPrice: data?.discountPrice,
      userId: options,
      expirationDate: '',
    },
    onSubmit: (values) => {
      Modal.confirm({
        title: type === 'add' ? '등록하시겠습니까?' : type === 'fix' ? '수정하시겠습니까?' : '발급하시겠습니까?',
        okText: '확인',
        cancelText: '취소',
        onOk: async () => {
          try {
            if (type === 'add') {
              await addCoupon(values);
              message.success('쿠폰 등록 성공!');
              fetchCoupons();
            } else if (type === 'fix') {
              await updateCoupon({ ...values, couponId });
              message.success('쿠폰 수정 성공!');
              fetchCoupons(couponId);
            } else if (type === 'send') {
              if (options.length === 0) {
                message.info('회원을 선택해주세요');
              } else if (values.couponName === undefined) {
                message.info('쿠폰을 선택하세요');
              } else if (values.expirationDate === '') {
                message.info('만료기한을 설정하세요');
              } else {
                await sendCoupon({
                  couponId: values.couponName,
                  userId: options,
                  expirationDate: values.expirationDate,
                });
                fetchCoupons();
                message.success('쿠폰 발급 성공!');
              }
            }
          } catch (error) {
            message.error('처리 중 오류가 발생했습니다.');
          }
          setIsModalOpen(false);
        },
      });
    },
  });

  return (
    <CouponModalStyled>
      <form onSubmit={coupon.handleSubmit}>
        {type === 'send' ? (
          <>
            <div className="inputForm">
              <div>쿠폰명</div>
              <Select
                allowClear
                options={coupons}
                value={coupon.values.couponName}
                onChange={(value) => coupon.setFieldValue('couponName', value)}
              />
            </div>
            <div className="inputForm">
              <div>유효기간</div>
              <DatePicker
                onChange={(value) => {
                  if (value) {
                    const formattedDate = dayjs(value).format('YYYY-MM-DD');
                    coupon.setFieldValue('expirationDate', formattedDate);
                  } else {
                    coupon.setFieldValue('expirationDate', '');
                  }
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="inputForm">
              <div>쿠폰 이름</div>
              <Input
                placeholder="쿠폰 이름을 입력해 주세요."
                name="couponName"
                onChange={coupon.handleChange}
                value={coupon.values.couponName}
              />
            </div>
            <div className="inputForm">
              <div>할인 가격</div>
              <Input
                placeholder="할인 가격을 입력해 주세요."
                name="discountPrice"
                onChange={coupon.handleChange}
                value={coupon.values.discountPrice}
              />
            </div>
          </>
        )}
        <div className="btn">
          <Button htmlType="submit">{type === 'add' ? '등록' : type === 'fix' ? '수정' : '발급'}</Button>
        </div>
      </form>
    </CouponModalStyled>
  );
};
export default CouponModal;

import { useFormik } from 'formik';
import { Button, DatePicker, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { CouponModalStyled } from './style';
import { addCoupon, updateCoupon } from '@/pages/api/couponApi';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

interface CouponProps {
  setIsModalOpen: any;
  type?: string;
  data?: any;
  options?: any;
  fetchCoupons?: any;
  couponId?: number;
}

const CouponModal = ({ setIsModalOpen, type, data, options, fetchCoupons, couponId }: CouponProps) => {
  const router = useRouter();
  const coupon = useFormik({
    initialValues: {
      couponName: data?.couponName || '',
      couponCode: data?.couponCode || '',
      discountPrice: data?.discountPrice || '',
      userId: options ? options.map((option: any) => option.value) : [],
      expire: '',
    },
    onSubmit: (values) => {
      Modal.confirm({
        title: type === 'add' ? '등록하시겠습니까?' : type === 'fix' ? '수정하시겠습니까?' : '발급하시겠습니까?',
        okText: '확인',
        cancelText: '취소',
        onOk: async () => {
          try {
            {
              type === 'add' ? (
                addCoupon(values).then(() => {
                  fetchCoupons();
                })
              ) : type === 'fix' ? (
                () => {
                  const updatedData = { ...values, couponId };
                  updateCoupon(updatedData).then(() => {
                    console.log('🚀 ~ onOk: ~ updatedData:', updatedData);

                    fetchCoupons();
                  });
                }
              ) : (
                <></>
              );
            }
          } catch (error) {
            console.log('🚀 ~ onOk: ~ error:', error);
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
                options={options}
                defaultValue={options}
                value={coupon.values.couponName}
                onChange={(value) => coupon.setFieldValue('couponName', value)}
              />
            </div>
            <div className="inputForm">
              <div>회원</div>
              <Select
                mode="multiple"
                allowClear
                options={options}
                defaultValue={options}
                value={coupon.values.userId}
                onChange={(value) => coupon.setFieldValue('userId', value)}
              />
            </div>
            <div className="inputForm">
              <div>유효기간</div>
              <DatePicker
                onChange={(value) => {
                  if (value) {
                    const formattedDate = dayjs(value).format('YYYY-MM-DD'); // 날짜를 'YYYY-MM-DD' 형식으로 포맷
                    coupon.setFieldValue('expire', formattedDate); // 포맷된 날짜를 상태에 저장
                  } else {
                    coupon.setFieldValue('expire', ''); // 선택이 없을 경우 빈 문자열로 설정
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
            {type === 'fix' ? (
              <div className="inputForm">
                <div>쿠폰 코드</div>
                <Input
                  placeholder="쿠폰 코드를 입력해 주세요."
                  name="couponCode"
                  onChange={coupon.handleChange}
                  value={coupon.values.couponCode}
                />
              </div>
            ) : (
              <></>
            )}
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

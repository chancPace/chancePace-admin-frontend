import { Button, Input, Modal, Table, Tag } from 'antd';
import { useFormik } from 'formik';
import router from 'next/router';
import { useEffect, useState } from 'react';
import CouponModal from '../Modals/Coupon';
import { searchCoupon } from '@/pages/api/couponApi';
import { searchUser } from '@/pages/api/userApi';
import { CouponData } from '@/types';
import BookingListStyled from './style';
import { getBooking } from '@/pages/api/bookingApi';

const BookingListPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCoupons = async () => {
    try {
      const response = await getBooking();
      const result = response.data;

      result?.map((x: CouponData, i: number) => {
        x.createdAt = x?.createdAt?.split('T')[0];
      });
      setData(result);
    } catch (error) {
      console.error('오류!!:', error);
    }
  };
  useEffect(() => {
    fetchCoupons();
  }, []);

  const columns = [
    {
      title: '예약 공간명',
      dataIndex: 'couponName',
      key: 'couponName',
    },
    {
      title: '예약자명',
      dataIndex: 'couponCode',
      key: 'couponCode',
    },
    {
      title: '예약 일',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a?: any, b?: any) => a?.startDate - b?.startDate,
    },
    {
      title: '체크인 시간',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: (a?: any, b?: any) => a?.startTime - b?.startTime,
    },
    {
      title: '체크아웃 시간',
      dataIndex: 'endTime',
      key: 'endTime',
      sorter: (a?: any, b?: any) => a?.endTime - b?.endTime,
    },
    {
      title: '인원',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      sorter: (a?: any, b?: any) => a?.discountPrice - b?.discountPrice,
    },
  ];

  const coupon = useFormik({
    initialValues: {
      search: '',
    },
    async onSubmit(values) {
      const response = await searchCoupon(values.search);
      const select = response.data;
      select.map((x: any, i: number) => {
        x.createdAt = x?.createdAt?.split('T')[0];
      });
      setData(select);
    },
  });

  return (
    <BookingListStyled>
      <p>예약 목록</p>
      <form onSubmit={coupon.handleSubmit} className="form_wrap">
        <Input placeholder="쿠폰 명, 쿠폰 코드로 검색해 주세요." name="search" onChange={coupon.handleChange} />
        <Button htmlType="submit">조회</Button>
      </form>

      <Modal
        width={400}
        title="쿠폰 등록"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        className="modal"
      >
        <CouponModal setIsModalOpen={setIsModalOpen} type="add" fetchCoupons={fetchCoupons} />
      </Modal>

      <Table
        columns={columns}
        dataSource={data}
        onRow={(record: any) => {
          return {
            onClick: (e) => {
              e.preventDefault();
              router.push(`/coupon/couponlist/coupondetail/${record?.id}`);
            },
          };
        }}
      />
    </BookingListStyled>
  );
};
export default BookingListPage;

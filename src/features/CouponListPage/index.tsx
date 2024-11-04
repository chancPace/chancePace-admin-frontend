import { Button, Input, Modal, Table, Tag } from 'antd';
import { useFormik } from 'formik';
import router from 'next/router';
import { useEffect, useState } from 'react';
import CouponListStyled from './style';
import CouponModal from '../Modals/Coupon';
import { getAllCoupon, searchCoupon } from '@/pages/api/couponApi';
import { searchUser } from '@/pages/api/userApi';

const CouponListPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCoupons = async () => {
    try {
      const response = await getAllCoupon();
      const result = response.data;
      result?.map((x: any, i: number) => {
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
      title: '쿠폰명',
      dataIndex: 'couponName',
      key: 'couponName',
    },
    {
      title: '쿠폰코드',
      dataIndex: 'couponCode',
      key: 'couponCode',
      // filters: [
      //   { text: '남성', value: 'MALE' },
      //   { text: '여성', value: 'FEMALE' },
      // ],
      // filterSearch: true,
      // onFilter: (value: any, record: any) => record.gender === value,
      // render: (gender: string) => (gender === 'MALE' ? '남성' : gender === 'FEMALE' ? '여성' : ''),
    },
    {
      title: '할인 가격',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      sorter: (a?: any, b?: any) => a?.discountPrice - b?.discountPrice,
    },
    {
      title: '상태',
      dataIndex: 'isActive',
      key: 'isActive',
      filters: [
        { text: '활성', value: true },
        { text: '비활성', value: false },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => record.isActive === value,
      render: (active: boolean) => (active ? <Tag color="blue">활성</Tag> : <Tag color="red">비활성</Tag>),
    },
    {
      title: '생성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a?: any, b?: any) => Number(a.createdAt.replace(/-/g, '')) - Number(b.createdAt.replace(/-/g, '')),
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
    <CouponListStyled>
      <p>쿠폰 목록</p>
      <Button type="primary" className="register" onClick={() => setIsModalOpen(true)}>
        등록
      </Button>
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
    </CouponListStyled>
  );
};
export default CouponListPage;
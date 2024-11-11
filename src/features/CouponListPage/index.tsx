import { Button, Input, Modal, Table, Tag } from 'antd';
import { useFormik } from 'formik';
import router from 'next/router';
import { useEffect, useState } from 'react';
import CouponListStyled from './style';
import CouponModal from '../Modals/Coupon';
import { getAllCoupon, searchCoupon } from '@/pages/api/couponApi';
import { CouponData } from '@/types';

const CouponListPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCoupons = async () => {
    try {
      const response = await getAllCoupon();
      const result = response.data;
      result?.map((x: CouponData, i: number) => {
        x.createdAt = x?.createdAt?.split('T')[0];
      });
      const dataWithKeys = result.map((item: CouponData) => ({ ...item, key: item.id }));
      setData(dataWithKeys);
    } catch (error) {
      console.error('오류!!:', error);
    }
  };
  useEffect(() => {
    fetchCoupons();
  }, []);

  const detailPage = (data: number) => {
    router.push(`/coupon/couponlist/coupondetail/${data}`);
  };

  const columns = [
    {
      title: '쿠폰명',
      dataIndex: 'couponName',
      key: 'couponName',
    },
    {
      title: '할인 가격',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      sorter: (a?: any, b?: any) => a?.discountPrice - b?.discountPrice,
      render: (data: any) => data.toLocaleString() + '원',
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
    {
      title: '상세페이지',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => <a onClick={() => detailPage(record.key)}>상세 보기</a>,
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
        <Input placeholder="쿠폰 명으로 검색해 주세요." name="search" onChange={coupon.handleChange} />
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

      <Table columns={columns} dataSource={data} />
    </CouponListStyled>
  );
};
export default CouponListPage;

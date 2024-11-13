import { Modal, Table, Tag } from 'antd';
import { useFormik } from 'formik';
import router from 'next/router';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CouponData } from '@/types';
import HostReqListStyled from './style';
import HostInquiryModal from '../Modals/HostInquiry';
import { getAllInquiry } from '@/pages/api/hostreqApi';

const HostReqListPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuiry = async () => {
    try {
      const response = await getAllInquiry();
      const result = response.data;
      const dataWithKeys = result.map((item: CouponData) => ({ ...item, key: item.id }));
      setData(dataWithKeys);
    } catch (error) {
      console.error('오류!!:', error);
    }
  };
  useEffect(() => {
    fetchQuiry();
  }, []);

  const columns = [
    {
      title: '제목',
      dataIndex: 'inquiryTitle',
      key: 'inquiryTitle',
    },
    {
      title: '이메일',
      dataIndex: 'inquiryEmail',
      key: 'inquiryEmail',
    },
    {
      title: '회원 / 비회원',
      dataIndex: 'memberType',
      key: 'memberType',
      filters: [
        { text: '회원', value: 'MEMBER' },
        { text: '비회원', value: 'NONMEMBER' },
      ],
      onFilter: (value: any, record: any) => record.memberType === value,
      render: (type: string) => (type === 'MEMBER' ? <Tag color="blue">회원</Tag> : <Tag color="red">비회원</Tag>),
    },
    {
      title: '답변 상태',
      dataIndex: 'inquiryStatus',
      key: 'inquiryStatus',
      filters: [
        { text: '완료', value: 'COMPLETED' },
        { text: '미답변', value: 'UNCOMPLETED' },
      ],
      onFilter: (value: any, record: any) => record.inquiyStatus === value,
      render: (status: string) =>
        status === 'COMPLETED' ? <Tag color="blue">완료</Tag> : <Tag color="red">미완료</Tag>,
    },
    {
      title: '내용',
      dataIndex: 'inquiryContents',
      key: 'inquiryContents',
    },
    {
      title: '문의 일자',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (data: any) => dayjs(data).format('YYYY-MM-DD'),
    },
    {
      title: '상세페이지',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => <a onClick={() => setIsModalOpen(true)}>상세 보기</a>,
    },
  ];

  // const coupon = useFormik({
  //   initialValues: {
  //     search: '',
  //   },
  //   async onSubmit(values) {
  //     const response = await searchCoupon(values.search);
  //     const select = response.data;
  //     select.map((x: any, i: number) => {
  //       x.createdAt = x?.createdAt?.split('T')[0];
  //     });
  //     setData(select);
  //   },
  // });

  return (
    <HostReqListStyled>
      <div className="top">
        <p>호스트 신청</p>
      </div>
      {/* <form onSubmit={coupon.handleSubmit} className="form_wrap">
        <Input placeholder="쿠폰 명으로 검색해 주세요." name="search" onChange={coupon.handleChange} />
        <Button htmlType="submit">조회</Button>
      </form> */}

      <Modal
        width={400}
        title="호스트 신청"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        className="modal"
      >
        <HostInquiryModal setIsModalOpen={setIsModalOpen} data={data} />
      </Modal>
      <Table columns={columns} dataSource={data} />
    </HostReqListStyled>
  );
};
export default HostReqListPage;

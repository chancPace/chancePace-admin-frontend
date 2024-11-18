import { Modal, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CouponData } from '@/types';
import HostReqListStyled from './style';
import HostInquiryModal from '../Modals/HostInquiry';
import { getAllInquiry } from '@/pages/api/hostreqApi';

const HostReqListPage = () => {
  const [data, setData] = useState([]);
  const [oneData, setOneData] = useState();
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

  const handleDetail = (data: any) => {
    setIsModalOpen(true);
    setOneData(data);
  };

  const columns: any = [
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
      title: '성함',
      dataIndex: 'inquiryName',
      key: 'inquiryName',
    },
    {
      title: '전화번호',
      dataIndex: 'inquiryPhoneNumber',
      key: 'inquiryPhoneNumber',
      render: (inquiryPhoneNumber: string) => {
        return inquiryPhoneNumber?.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
      },
    },
    {
      title: '내용',
      dataIndex: 'inquiryContents',
      key: 'inquiryContents',
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
      title: '문의 일자',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (data: any) => dayjs(data).format('YYYY-MM-DD'),
      sorter: (a?: any, b?: any) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
    },
    {
      title: '상세 페이지',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => <a onClick={() => handleDetail(record)}>상세 보기</a>,
    },
  ];

  return (
    <HostReqListStyled>
      <div className="top">
        <p>호스트 신청 목록</p>
      </div>
      <Modal
        width={450}
        title="호스트 신청"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        className="modal"
      >
        <HostInquiryModal setIsModalOpen={setIsModalOpen} data={oneData} />
      </Modal>
      <Table columns={columns} dataSource={data} />
    </HostReqListStyled>
  );
};
export default HostReqListPage;

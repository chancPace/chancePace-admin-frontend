import { Button, Input, message, Table } from 'antd';
import { useFormik } from 'formik';
import router from 'next/router';
import { useEffect, useState } from 'react';
import BookingListStyled from './style';
import { getAllBooking, searchBooking } from '@/pages/api/bookingApi';
import dayjs from 'dayjs';

const BookingListPage = () => {
  const [data, setData] = useState<any>([]);
  const [space, setSpace] = useState<any>();

  const fetchBookings = async () => {
    try {
      const response = await getAllBooking();
      const result = response.data;
      const dataWithKeys = result.map((item: any) => ({ ...item, key: item.id }));
      setData(dataWithKeys);
    } catch (error) {
      console.error('오류!!:', error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  const detailPage = (data: number) => {
    router.push(`/booking/bookinglist/bookingdetail/${data}`);
  };

  const columns = [
    {
      title: '예약 공간명',
      dataIndex: 'space.spaceName',
      key: 'space.spaceName',
      render: (text: any, record: any) => record?.space?.spaceName,
    },
    {
      title: '예약자 성함',
      dataIndex: 'user.userName',
      key: 'user.userName',
      render: (text: any, record: any) => record?.user?.userName,
    },
    {
      title: '예약 일',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: any) => dayjs(date).format('YYYY-MM-DD'),
      sorter: (a?: any, b?: any) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf(),
    },
    {
      title: '체크인 시간',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: any) => (text !== undefined && text !== null ? `${text}시` : ''),
    },
    {
      title: '체크아웃 시간',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: any) => (text !== undefined && text !== null ? `${text}시` : ''),
    },
    {
      title: '상세 페이지',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => <a onClick={() => detailPage(record.key)}>상세 보기</a>,
    },
  ];

  const booking = useFormik({
    initialValues: {
      search: '',
    },
    async onSubmit(values) {
      if (values.search === '') {
        message.info('검색어를 입력하세요');
        fetchBookings();
      } else {
        const response = await searchBooking(values.search);
        const search = response.data.data;
        setData(search);
      }
    },
  });

  return (
    <BookingListStyled>
      <p>예약 목록</p>
      <form onSubmit={booking.handleSubmit} className="form_wrap">
        <Input placeholder="공간 명, 예약자 성항으로 검색해 주세요." name="search" onChange={booking.handleChange} />
        <Button htmlType="submit">조회</Button>
      </form>
      <Table columns={columns} dataSource={data} />
    </BookingListStyled>
  );
};
export default BookingListPage;

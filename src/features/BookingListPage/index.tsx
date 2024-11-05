import { Button, Input, Table } from 'antd';
import { useFormik } from 'formik';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { CouponData } from '@/types';
import BookingListStyled from './style';
import { getAllBooking, searchBooking } from '@/pages/api/bookingApi';
import { getOneSpace } from '@/pages/api/spaceAPI';

const BookingListPage = () => {
  const [data, setData] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [space, setSpace] = useState<any>();

  const fetchBookings = async () => {
    try {
      const response = await getAllBooking();
      const result = response.data;
      setData(result);
    } catch (error) {
      console.error('오류!!:', error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  const columns = [
    {
      title: '예약 공간명',
      dataIndex: 'Space.spaceName',
      key: 'Space.spaceName',
      render: (text: any, record: any) => {
        // 여기서 데이터를 변형하거나 추가적으로 처리할 수 있음
        return `${record.Space.spaceName}`; // 예시로 변형된 값 반환
      },
    },
    {
      title: '예약자 성함',
      dataIndex: 'User.userName',
      key: 'User.userName',
      render: (text: any, record: any) => {
        // 여기서 데이터를 변형하거나 추가적으로 처리할 수 있음
        return `${record.User.userName}`; // 예시로 변형된 값 반환
      },
    },
    {
      title: '예약 일',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: any, b: any) => {
        const dateA = new Date(a?.startDate); // 날짜 문자열을 Date 객체로 변환
        const dateB = new Date(b?.startDate); // 날짜 문자열을 Date 객체로 변환
        return dateA.getTime() - dateB.getTime(); // getTime()으로 타임스탬프를 비교
      },
    },
    {
      title: '체크인 시간',
      dataIndex: 'startTime',
      key: 'startTime',
      // sorter: (a?: any, b?: any) => a?.startTime - b?.startTime,
      render: (text: any) => {
        // 숫자를 '0시', '1시', ..., '23시'로 변환
        if (text !== undefined && text !== null) {
          return `${text}시`; // 숫자 뒤에 '시'를 추가하여 출력
        }
        return ''; // 값이 없으면 빈 문자열 출력
      },
    },
    {
      title: '체크아웃 시간',
      dataIndex: 'endTime',
      key: 'endTime',
      // sorter: (a?: any, b?: any) => a?.endTime - b?.endTime,
      render: (text: any) => {
        // 숫자를 '0시', '1시', ..., '23시'로 변환
        if (text !== undefined && text !== null) {
          return `${text}시`; // 숫자 뒤에 '시'를 추가하여 출력
        }
        return ''; // 값이 없으면 빈 문자열 출력
      },
    },
    {
      title: '인원',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      sorter: (a?: any, b?: any) => a?.discountPrice - b?.discountPrice,
    },
  ];

  const booking = useFormik({
    initialValues: {
      search: '',
    },
    async onSubmit(values) {
      const response = await searchBooking(values.search);
      console.log('🚀 ~ onSubmit ~ response:', response);
      const search = response.data.data[0].Bookings;
      setData(search);
    },
  });

  return (
    <BookingListStyled>
      <p>예약 목록</p>
      <form onSubmit={booking.handleSubmit} className="form_wrap">
        <Input placeholder="공간 명, 예약자 성항으로 검색해 주세요." name="search" onChange={booking.handleChange} />
        <Button htmlType="submit">조회</Button>
      </form>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record: any) => {
          return {
            onClick: (e) => {
              e.preventDefault();
              router.push(`/booking/bookinglist/bookingdetail/${record?.id}`);
            },
          };
        }}
      />
    </BookingListStyled>
  );
};
export default BookingListPage;

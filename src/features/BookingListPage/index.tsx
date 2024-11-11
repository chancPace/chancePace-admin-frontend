import { Button, Input, Table } from 'antd';
import { useFormik } from 'formik';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { CouponData } from '@/types';
import BookingListStyled from './style';
import { getAllBooking, searchBooking } from '@/pages/api/bookingApi';
import { getOneSpace } from '@/pages/api/spaceAPI';

const BookingListPage = () => {
  const [data, setData] = useState<any>([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
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
      render: (text: any, record: any) => {
        // 여기서 데이터를 변형하거나 추가적으로 처리할 수 있음
        return `${record?.space?.spaceName}`; // 예시로 변형된 값 반환
      },
    },
    {
      title: '예약자 성함',
      dataIndex: 'user.userName',
      key: 'user.userName',
      render: (text: any, record: any) => {
        // 여기서 데이터를 변형하거나 추가적으로 처리할 수 있음
        return `${record?.user?.userName}`; // 예시로 변형된 값 반환
      },
    },
    {
      title: '예약 일',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: any, b: any) => {
        const dateA = new Date(a?.startDate);
        const dateB = new Date(b?.startDate);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      title: '체크인 시간',
      dataIndex: 'startTime',
      key: 'startTime',
      // sorter: (a?: any, b?: any) => a?.startTime - b?.startTime,
      render: (text: any) => {
        if (text !== undefined && text !== null) {
          return `${text}시`;
        }
        return '';
      },
    },
    {
      title: '체크아웃 시간',
      dataIndex: 'endTime',
      key: 'endTime',
      // sorter: (a?: any, b?: any) => a?.endTime - b?.endTime,
      render: (text: any) => {
        if (text !== undefined && text !== null) {
          return `${text}시`;
        }
        return '';
      },
    },
    // {
    //   title: '인원',
    //   dataIndex: 'discountPrice',
    //   key: 'discountPrice',
    //   sorter: (a?: any, b?: any) => a?.discountPrice - b?.discountPrice,
    // },
    {
      title: '상세페이지',
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
      const response = await searchBooking(values.search);
      const search = response.data.data;
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
      <Table columns={columns} dataSource={data} />
    </BookingListStyled>
  );
};
export default BookingListPage;

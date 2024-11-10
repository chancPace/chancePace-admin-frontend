import { useRouter } from 'next/router';
import { Badge, Button, Descriptions, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { CouponData } from '@/types';
import BookingDetailStyled from './style';
import { getOneBooking } from '@/pages/api/bookingApi';

const BookingDeatilPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const bookingId = Number(id);
  const [data, setData] = useState<any>();

  const fetchBookingData = async (bookingId: number) => {
    try {
      const response = await getOneBooking(bookingId);
      const result = response.data.data;
      setData(result);
    } catch (error) {
      console.log('쿠폰 상세', error);
    }
  };
  useEffect(() => {
    fetchBookingData(bookingId);
  }, []);

  const items = [
    // 예약자 정보
    {
      key: '1',
      label: '예약자 성함',
      children: data?.user?.userName,
    },
    {
      key: '2',
      label: '예약자 이메일',
      children: data?.user?.email,
    },
    {
      key: '3',
      label: '예약자 전화번호',
      children: data?.user?.phoneNumber,
    },
    // 예약 공간
    {
      key: '4',
      label: '공간 명',
      children: data?.space?.spaceName,
    },
    {
      key: '3',
      label: '공간 관리자명',
      children: data?.space?.spaceAdminName,
    },
    {
      key: '3',
      label: '공간 관리자 전화번호',
      children: data?.space?.spaceAdminPhoneNumber,
    },
    {
      key: '3',
      label: '공간 주소',
      children: data?.space?.spaceLocation,
      span: 3,
    },
    {
      key: '4',
      label: '예약 일',
      children: data?.startDate,
    },
    {
      key: '5',
      label: '이용 시간(체크인 ~ 체크아웃)',
      children: `${data?.startTime}시 ~ ${data?.endTime}시`,
    },
    {
      key: '6',
      label: '예약 인원 수',
      children: '예약 인원 수',
    },
    {
      key: '7',
      label: '결제방식',
      children: data?.payment?.paymentMethod,
    },
    {
      key: '7',
      label: '신용 / 체크',
      children: data?.payment?.cardType !== 'UNKNOWN' ? `${data?.payment?.cardType}` : '-',
    },
    {
      key: '7',
      label: '카드번호',
      children: data?.payment?.cardNumber !== 'UNKNOWN' ? `${data?.payment?.cardNumber}` : '-',
    },
    {
      key: '7',
      label: '원가',
      children:
        data?.payment?.couponPrice !== null
          ? `${data?.payment?.paymentPrice + data?.payment?.couponPrice.toLocaleString()}`
          : `${data?.payment?.paymentPrice.toLocaleString()}`,
    },
    {
      key: '7',
      label: '결제 금액',
      children: data?.payment?.paymentPrice.toLocaleString(),
    },
    {
      key: '7',
      label: '쿠폰 사용 금액',
      children: data?.payment?.couponPrice === null ? '-' : `${data?.payment?.couponPrice.toLocaleString()}`,
    },
  ];

  return (
    <BookingDetailStyled>
      <p>예약 상세 정보</p>
      <Descriptions bordered items={items} />
    </BookingDetailStyled>
  );
};

export default BookingDeatilPage;

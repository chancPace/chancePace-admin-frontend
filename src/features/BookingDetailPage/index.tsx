import { useRouter } from 'next/router';
import { Badge, Button, Descriptions, message, Modal, Tag } from 'antd';
import { useEffect, useState } from 'react';
import BookingDetailStyled from './style';
import { getOneBooking } from '@/pages/api/bookingApi';
import { Refund } from '@/pages/api/paymentApi';

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
      children: `${data?.user?.phoneNumber?.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')}`,
    },
    // 예약 공간
    {
      key: '4',
      label: '공간 명',
      children: data?.space?.spaceName,
    },
    {
      key: '5',
      label: '공간 관리자명',
      children: data?.space?.spaceAdminName,
    },
    {
      key: '6',
      label: '공간 관리자 전화번호',
      children: `${data?.space?.spaceAdminPhoneNumber?.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')}`,
    },
    {
      key: '7',
      label: '공간 주소',
      children: data?.space?.spaceLocation,
      span: 3,
    },
    {
      key: '8',
      label: '예약 일',
      children: data?.startDate,
    },
    {
      key: '9',
      label: '이용 시간(체크인 ~ 체크아웃)',
      children: `${data?.startTime}시 ~ ${data?.endTime}시`,
    },
    {
      key: '9',
      label: '예약 상태',
      children:
        data?.bookingStatus === 'COMPLETED' ? <Tag color="blue">예약 완료</Tag> : <Tag color="red">예약 취소</Tag>,
    },
    // 결제 정보
    {
      key: '10',
      label: '결제방식',
      children: data?.payment?.paymentMethod,
    },
    {
      key: '11',
      label: '신용 / 체크',
      children: data?.payment?.cardType !== 'UNKNOWN' ? `${data?.payment?.cardType}` : '-',
    },
    {
      key: '12',
      label: '카드번호',
      children: data?.payment?.cardNumber !== 'UNKNOWN' ? `${data?.payment?.cardNumber}` : '-',
    },
    {
      key: '13',
      label: '원가',
      children: `${(data?.payment?.paymentPrice + data?.payment?.couponPrice).toLocaleString()}` + '원',
    },
    {
      key: '14',
      label: '결제 금액',
      children: data?.payment?.paymentPrice.toLocaleString() + '원',
    },
    {
      key: '15',
      label: '쿠폰 사용 금액',
      children: data?.payment?.couponPrice === null ? '-' : `${data?.payment?.couponPrice.toLocaleString()}` + '원',
    },
  ];

  return (
    <BookingDetailStyled>
      <div className="top">
        <p>예약 상세조회</p>
        {data?.bookingStatus === 'COMPLETED' ? (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '예약을 취소하시겠습니까?',
                okText: '확인',
                cancelText: '취소',
                onOk: async () => {
                  try {
                    const cancelReason = '고객 요청에 따른 취소';
                    await Refund(Number(bookingId), cancelReason);
                    message.success('예약이 취소되었습니다');
                    router.push('/booking/bookinglist');
                  } catch (error) {
                    message.error('예약 취소 실패');
                    console.error('예약취소실패', error);
                  }
                },
              });
            }}
          >
            취소
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Descriptions bordered items={items} />
    </BookingDetailStyled>
  );
};

export default BookingDeatilPage;

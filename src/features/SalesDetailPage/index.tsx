import { useRouter } from 'next/router';
import { Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import SpaceDetailStyled from './style';
import dayjs from 'dayjs';
import { getOnePayment } from '@/pages/api/paymentApi';

const SalesDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const paymentId = Number(id);
  const [data, setData] = useState<any>();

  const fetchPaymentData = async () => {
    try {
      const response = await getOnePayment(paymentId);
      const result = response.data;
      setData(result);
    } catch (error) {
      console.log('결제 1개', error);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const items = [
    // 결제정보
    {
      key: '1',
      label: '결제일',
      children: dayjs(data?.createdAt).format('YYYY-MM-DD'),
    },
    {
      key: '2',
      label: '결제 방식',
      children: data?.paymentMethod,
    },
    {
      key: '3',
      label: '신용 / 체크',
      children: data?.cardType !== 'UNKNOWN' ? `${data?.cardType}` : '-',
    },
    {
      key: '4',
      label: '카드번호',
      children: data?.cardNumber !== 'UNKNOWN' ? `${data?.cardNumber}` : '-',
    },
    {
      key: '5',
      label: '매출액',
      children: data?.paymentPrice.toLocaleString() + '원',
    },
    {
      key: '6',
      label: '쿠폰 사용금액',
      children: data?.couponPrice.toLocaleString() + '원',
    },
    {
      key: '7',
      label: '실제 결제 금액',
      children: `${data?.paymentPrice + data?.couponPrice}`.toLocaleString() + '원',
    },
    // 결제자 정보

    {
      key: '8',
      label: '예약자 성함',
      children: data?.user?.userName,
    },
    {
      key: '9',
      label: '예약자 이메일',
      children: data?.user?.email,
    },
    {
      key: '10',
      label: '예약자 전화번호',
      children: data?.user?.phoneNumber,
    },
    // 결제 장소 정보

    {
      key: '11',
      label: '공간 명',
      children: data?.booking?.space?.spaceName,
    },
    {
      key: '12',
      label: '공간 주소',
      children: data?.booking?.space?.spaceLocation,
      span: 3,
    },
  ];

  return (
    <SpaceDetailStyled>
      <p>매출 상세 정보</p>
      <Descriptions bordered items={items} />
    </SpaceDetailStyled>
  );
};

export default SalesDetailPage;

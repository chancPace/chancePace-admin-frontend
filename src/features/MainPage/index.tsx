import { MainStyled } from './style';
import Charts from '@/components/charts';
import personIcon from '@/assets/img/personIcon.png';
import { useEffect, useState } from 'react';
import { getAllSpace } from '@/pages/api/spaceAPI';
import { getAllUser } from '@/pages/api/userApi';
import dayjs from 'dayjs';
import { getAllBooking } from '@/pages/api/bookingApi';
import { getAllPayment } from '@/pages/api/paymentApi';
import { CarryOutOutlined, CreditCardOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Router, useRouter } from 'next/router';

const MainPage = () => {
  const [spaceAllow, SetSpaceAllow] = useState();
  const [visitor, setVisitor] = useState();
  const [todayBooking, setTodayBooking] = useState();
  const [todayPayment, setTodayPayment] = useState();
  const router = useRouter();

  const fetchData = async () => {
    const user = await getAllUser();
    const space = await getAllSpace();
    const booking = await getAllBooking();
    const payments = await getAllPayment();

    const visit = user?.data?.data?.filter((x: any, i: number) => {
      return dayjs(x?.lastLogin).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
    });
    const allow = space?.data?.filter((x: any, i: number) => {
      return x.spaceStatus === 'UNAVAILABLE';
    });
    const todaybooking = booking?.data?.filter((x: any, i: number) => {
      return x?.startDate === dayjs().format('YYYY-MM-DD');
    });
    const todaypayment = payments?.data?.filter((x: any, i: number) => {
      return dayjs(x?.createdAt).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
    });

    setVisitor(visit.length);
    SetSpaceAllow(allow.length);
    setTodayBooking(todaybooking.length);
    setTodayPayment(todaypayment.length);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainStyled>
      <div className="content_wrap">
        <div className="content" onClick={() => router.push('/space/spacelist')}>
          <p className="title">공간 승인 요청</p>
          <div className="bottom">
            <CarryOutOutlined className="icon" />
            <span>{spaceAllow} 건</span>
          </div>
        </div>
        <div className="content" onClick={() => router.push('/booking/bookinglist')}>
          <p className="title">오늘 공간 이용</p>
          <div className="bottom">
            <HomeOutlined className="icon" />
            <span>{todayBooking} 건</span>
          </div>
        </div>
        <div className="content" onClick={() => router.push('/sales/day')}>
          <p className="title">결제 건수</p>
          <div className="bottom">
            <CreditCardOutlined className="icon" />
            <span>{todayPayment} 건</span>
          </div>
        </div>
        <div className="content">
          <p className="title">금일 접속자 수</p>
          <div className="bottom">
            <UserOutlined className="icon" />
            <span>{todayPayment} 건</span>
          </div>
        </div>
      </div>
      <Charts />
    </MainStyled>
  );
};
export default MainPage;

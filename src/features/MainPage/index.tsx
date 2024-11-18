import { MainStyled } from './style';
import Charts from '@/components/charts';
import { useEffect, useState } from 'react';
import { getAllSpace } from '@/pages/api/spaceAPI';
import { getAllUser } from '@/pages/api/userApi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getAllBooking } from '@/pages/api/bookingApi';
import { getAllPayment } from '@/pages/api/paymentApi';
import { CarryOutOutlined, CreditCardOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
dayjs.extend(utc); // UTC 플러그인 확장
dayjs.extend(timezone); // timezone 플러그인 사용

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
      return (
        dayjs(x?.lastLogin).tz('Asia/Seoul').format('YYYY-MM-DD') === dayjs().tz('Asia/Seoul').format('YYYY-MM-DD')
      );
    });
    const allow = space?.data?.filter((x: any, i: number) => {
      return x.spaceStatus === 'UNAVAILABLE';
    });
    const todaybooking = booking?.data?.filter((x: any, i: number) => {
      return (
        dayjs(x?.startDate).tz('Asia/Seoul').format('YYYY-MM-DD') === dayjs().tz('Asia/Seoul').format('YYYY-MM-DD')
      );
    });
    const todaypayment = payments?.data?.filter((x: any, i: number) => {
      return (
        x.paymentStatus !== 'REFUNDED' &&
        dayjs(x?.createdAt).tz('Asia/Seoul').format('YYYY-MM-DD') === dayjs().tz('Asia/Seoul').format('YYYY-MM-DD')
      );
    });
    console.log('🚀 ~ visit ~ visit:', visit);
    console.log('🚀 ~ todaybooking ~ todaybooking:', todaybooking);
    console.log('🚀 ~ todaypayment ~ todaypayment:', todaypayment);

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
          <p className="title">금일 로그인 이용자 수</p>
          <div className="bottom">
            <UserOutlined className="icon" />
            <span>{visitor} 명</span>
          </div>
        </div>
      </div>
      <Charts />
    </MainStyled>
  );
};
export default MainPage;

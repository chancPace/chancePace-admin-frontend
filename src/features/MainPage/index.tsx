import { MainStyled } from './style';
import Charts from '@/components/charts';
import personIcon from '@/assets/img/personIcon.png';
import { useEffect, useState } from 'react';
import { getAllSpace } from '@/pages/api/spaceAPI';
import { getAllUser } from '@/pages/api/userApi';
import dayjs from 'dayjs';
import { getAllBooking } from '@/pages/api/bookingApi';
import { getAllPayment } from '@/pages/api/paymentApi';
import SalesDayPage from '../SalesDayPage';

const MainPage = () => {
  const [spaceAllow, SetSpaceAllow] = useState();
  const [visitor, setVisitor] = useState();
  const [todayBooking, setTodayBooking] = useState();
  const [todayPayment, setTodayPayment] = useState();

  const fetchData = async () => {
    const user = await getAllUser();
    const space = await getAllSpace();
    const booking = await getAllBooking();
    const payments = await getAllPayment();

    const visit = user?.data?.data?.filter((x: any, i: number) => {
      return dayjs(x?.lastLogin).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
    });
    const allow = space?.data?.filter((x: any, i: number) => {
      x.spaceStatus === 'UNAVAILABLE';
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
      <div className="wrap top">
        <p>관리</p>
        <hr></hr>
        <div className="content">
          <p>
            공간 승인 요청 <span>{spaceAllow}</span>
          </p>
          <p>
            오늘 공간 이용 <span>{todayBooking}</span>
          </p>
          <p>
            결제 건수
            <span>{todayPayment}</span>
          </p>
        </div>
      </div>
      <div className="bottom">
        <div className="wrap bottomLeft">
          <p>금일 접속자 수</p>
          <hr></hr>
          <div className="content">
            <img src={personIcon.src} alt="personIcon" />
            <span>{visitor}</span>
          </div>
        </div>
        <div className="wrap bottomRight">
          <Charts />
        </div>
      </div>
    </MainStyled>
  );
};
export default MainPage;

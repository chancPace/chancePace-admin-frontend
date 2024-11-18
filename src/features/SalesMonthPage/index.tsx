import { getAllPayment } from '@/pages/api/paymentApi';
import { DatePicker, message, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import router from 'next/router';
import ChartStyled from './style';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SalesYearPage = () => {
  const currentYear = dayjs().year().toString();
  const [sales, setSales] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [selectedDateTime, setSelectedDateTime] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // 연도별 결제 내역을 가져오는 함수
  const fetchPayments = async () => {
    try {
      const response = await getAllPayment();
      const allData = response?.data?.filter((x: any) => dayjs(x.createdAt).format('YYYY') === selectedYear);
      const target = response?.data?.filter(
        (x: any) => x.paymentStatus !== 'REFUNDED' && dayjs(x.createdAt).format('YYYY') === selectedYear
      );
      const formatData = allData.map((x: any) => {
        const totalAmount = x.paymentPrice + x.couponPrice;
        const feeAmount = x.paymentPrice * 0.05;
        return {
          ...x,
          id: x.id,
          totalAmount,
          feeAmount,
        };
      });

      // 월별로 매출, 수수료 등을 집계
      const salesData = target.reduce((acc: any, x: any) => {
        const month = dayjs(x.createdAt).month() + 1;
        const monthStr = month < 10 ? `0${month}` : `${month}`;
        if (dayjs(x.createdAt).year() === parseInt(selectedYear)) {
          const totalAmount = x.paymentPrice + x.couponPrice;
          const feeAmount = x.paymentPrice * 0.05;

          if (!acc[monthStr]) {
            acc[monthStr] = {
              totalPaymentPrice: 0,
              count: 0,
              feeAmount: 0,
            };
          }

          acc[monthStr].totalPaymentPrice += totalAmount;
          acc[monthStr].count += 1;
          acc[monthStr].feeAmount += feeAmount;
        }
        return acc;
      }, {});

      // 집계된 월별 데이터를 배열로 변환
      const salesArray = Object.keys(salesData).map((key) => ({
        month: key,
        ...salesData[key],
      }));

      setSales(salesArray);
      setData(formatData);
    } catch (error) {
      message.error('결제 데이터를 불러오는 데 실패했습니다.');
    }
  };

  // 연도 선택 시 호출되는 함수
  const onChange = (date: dayjs.Dayjs | null) => {
    setSelectedDateTime(date);
    if (date) {
      setSelectedYear(date.year().toString());
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [selectedYear]);

  // 차트에 표시할 데이터 포맷팅
  const formattedSales = sales.reduce((acc, item) => {
    acc[item.month] = {
      totalPaymentPrice: item.totalPaymentPrice || 0,
      count: item.count || 0,
      feeAmount: item.feeAmount || 0,
    };
    return acc;
  }, {});

  // 1월부터 12월까지의 월 배열 생성
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  // 각 월에 해당하는 매출, 건수, 수수료 배열
  const totalPaymentPrices = months.map((month) => formattedSales[month]?.totalPaymentPrice || 0);
  const counts = months.map((month) => formattedSales[month]?.count || 0);
  const feeAmounts = months.map((month) => formattedSales[month]?.feeAmount || 0);

  // 차트 데이터
  const chartData: ChartData = {
    labels: months,
    datasets: [
      {
        type: 'bar',
        label: '매출액',
        data: totalPaymentPrices,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        yAxisID: 'y-left',
      },
      {
        type: 'bar',
        label: '수수료 금액',
        data: feeAmounts,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 1,
        yAxisID: 'y-left',
      },
      {
        type: 'line',
        label: '매출건수',
        data: counts,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        yAxisID: 'y-right',
      },
    ],
  };

  // 차트 옵션
  const chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: '기간 (월)',
        },
      },
      'y-left': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: '매출액 / 수수료 금액 (원)',
        },
        grid: {
          display: true,
        },
      },
      'y-right': {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: '매출건수',
        },
        ticks: {
          stepSize: 1,
          callback: (value: any) => `${Math.floor(value)}`,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `${selectedYear}년 월별 매출 분석`,
      },
    },
  };

  // 테이블 컬럼 설정
  const columns = [
    {
      title: '결제일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (data: any) => dayjs(data).format('YYYY-MM-DD'),
      sorter: (a?: any, b?: any) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
    },
    {
      title: '결제 방식',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: '매출액',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (data: any) => `${data?.toLocaleString()}원`,
      sorter: (a: any, b: any) => a.totalAmount - b.totalAmount,
    },
    {
      title: '결제 금액',
      dataIndex: 'paymentPrice',
      key: 'paymentPrice',
      render: (data: any) => `${data?.toLocaleString()}원`,
      sorter: (a: any, b: any) => a.paymentPrice - b.paymentPrice,
    },
    {
      title: '쿠폰 사용금액',
      dataIndex: 'couponPrice',
      key: 'couponPrice',
      render: (data: any) => `${data?.toLocaleString()}원`,
      sorter: (a: any, b: any) => a.couponPrice - b.couponPrice,
    },
    {
      title: '수수료 금액',
      dataIndex: 'feeAmount',
      key: 'feeAmount',
      render: (data: any) => `${data?.toLocaleString()}원`,
      sorter: (a: any, b: any) => a.feeAmount - b.feeAmount,
    },
    {
      title: '결제 상태',
      dataIndex: 'paymentStatus',
      filters: [
        { text: '결제 완료', value: 'COMPLETED' },
        { text: '결제 취소', value: 'REFUNDED' },
      ],
      onFilter: (value: any, record: any) => record.paymentStatus == value,
      render: (paymentStatus: string) =>
        paymentStatus === 'COMPLETED' ? <Tag color="blue">결제 완료</Tag> : <Tag color="red">결제취소</Tag>,
    },
    {
      title: '상세페이지',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => <a onClick={() => router.push(`/sales/salesdetail/${record.id}`)}>상세 보기</a>,
    },
  ];

  return (
    <ChartStyled>
      <div className="top">
        <div>
          <DatePicker
            picker={'year'}
            value={selectedDateTime}
            onChange={onChange}
            placeholder={'연도를 선택하세요'}
            style={{ width: '200px' }}
          />
        </div>
      </div>
      <Chart data={chartData} options={chartOptions} type={'bar'} />
      <p className="title">매출 목록</p>
      <Table columns={columns} dataSource={data} />
    </ChartStyled>
  );
};

export default SalesYearPage;

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
  LineElement,
  LineController,
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

const SalesDayPage = () => {
  const currentMonth = (dayjs().month() + 1).toString();
  const [sales, setSales] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [selectedDateTime, setSelectedDateTime] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // 월별 날짜를 일별로 나누는 함수 (윤년, 2월, 31일 등 고려)
  const generateDailyDates = (month: number, year: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  };

  // 결제 내역을 가져오는 함수
  const fetchPayments = async () => {
    try {
      const response = await getAllPayment();
      const allData = response?.data?.filter(
        (x: any) => dayjs(x.createdAt).format('YYYY-MM') === dayjs(selectedDateTime).format('YYYY-MM')
      );
      const target = response?.data?.filter(
        (x: any) =>
          x.paymentStatus !== 'REFUNDED' &&
          dayjs(x.createdAt).format('YYYY-MM') === dayjs(selectedDateTime).format('YYYY-MM')
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

      const salesData = target.reduce((acc: any, x: any) => {
        const date = dayjs(x.createdAt);
        const day = date.date().toString();
        if (date.month() + 1 === parseInt(selectedMonth)) {
          const totalAmount = x.paymentPrice + x.couponPrice;
          const feeAmount = x.paymentPrice * 0.05; // 수수료 5%

          if (!acc[day]) {
            acc[day] = {
              totalPaymentPrice: 0,
              count: 0,
              feeAmount: 0,
            };
          }

          acc[day].totalPaymentPrice += totalAmount;
          acc[day].count += 1;
          acc[day].feeAmount += feeAmount;
        }
        return acc;
      }, {});

      const salesArray = Object.keys(salesData).map((key) => ({
        day: key,
        ...salesData[key],
      }));

      setSales(salesArray);
      setData(formatData);
    } catch (error) {
      message.error('결제 데이터를 불러오는 데 실패했습니다.');
    }
  };

  // 월을 선택했을 때 호출되는 함수
  const onChange = (date: dayjs.Dayjs | null) => {
    setSelectedDateTime(date);
    if (date) {
      setSelectedMonth((date.month() + 1).toString());
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [selectedMonth]);

  // 선택된 월의 일별 날짜들
  const days = generateDailyDates(parseInt(selectedMonth), dayjs().year());

  // 차트에 표시할 데이터 포맷팅
  const formattedSales = sales.reduce((acc, item) => {
    acc[item.day] = {
      totalPaymentPrice: item.totalPaymentPrice || 0,
      count: item.count || 0,
      feeAmount: item.feeAmount || 0,
    };
    return acc;
  }, {});

  const totalPaymentPrices = days.map((day) => formattedSales[day]?.totalPaymentPrice || 0);
  const counts = days.map((day) => formattedSales[day]?.count || 0);
  const feeAmounts = days.map((day) => formattedSales[day]?.feeAmount || 0);

  const chartData: ChartData = {
    labels: days,
    datasets: [
      {
        type: 'bar',
        label: '매출액',
        data: totalPaymentPrices,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        yAxisID: 'y-left', // 왼쪽 Y축에 매핑
      },
      {
        type: 'bar',
        label: '수수료 금액',
        data: feeAmounts,
        backgroundColor: 'rgba(255, 159, 64, 0.2)', // 수수료 색 변경
        borderColor: 'rgb(255, 159, 64)', // 수수료 색 변경
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

  const chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: '기간 (일)',
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
        text: '일별 매출 분석',
      },
    },
  };

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
            picker={'month'}
            value={selectedDateTime}
            onChange={onChange}
            placeholder={'월을 선택하세요'}
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

export default SalesDayPage;

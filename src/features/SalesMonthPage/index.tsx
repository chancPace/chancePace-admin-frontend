import { getAllPayment } from '@/pages/api/paymentApi';
import { Button, DatePicker, message, Table } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const SalesMonthPage = () => {
  const currentYear = dayjs().year().toString();
  const [sales, setSales] = useState<any[]>([]);
  const [data, setData] = useState();
  const [selectedDateTime, setSelectedDateTime] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // 결제 내역을 가져오는 함수
  const fetchPayments = async () => {
    const response = await getAllPayment();
    const result = response?.data?.filter((x: any, i: number) => {
      return dayjs(x.createdAt).format('YYYY') === selectedYear;
    });
    const dataWithKeys = result.map((item: any) => ({ ...item, key: item.id }));
    setData(dataWithKeys);
    const monthlySales: { [month: string]: { totalPaymentPrice: number; count: number } } = {};

    // 1월부터 12월까지 초기화
    for (let i = 1; i <= 12; i++) {
      const month = i < 10 ? `0${i}` : `${i}`;
      monthlySales[`${selectedYear}-${month}`] = { totalPaymentPrice: 0, count: 0 };
    }

    // 결제 내역을 월별 처리
    response.data.forEach((x: any) => {
      if (typeof x.paymentPrice === 'number' && !isNaN(x.paymentPrice)) {
        const date = new Date(x.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const monthKey = `${year}-${month < 10 ? `0${month}` : month}`;

        // 선택된 연도와 일치하는 데이터만 필터링
        if (year.toString() === selectedYear) {
          // 월별 매출 처리
          monthlySales[monthKey] = monthlySales[monthKey] || { totalPaymentPrice: 0, count: 0 };
          monthlySales[monthKey].totalPaymentPrice += x.paymentPrice;
          monthlySales[monthKey].count += 1;
        }
      }
    });

    // 월별 매출 데이터 배열로 변환
    const salesData = Object.keys(monthlySales).map((key) => ({
      monthYear: key,
      totalPaymentPrice: monthlySales[key].totalPaymentPrice || 0,
      count: monthlySales[key].count || 0,
    }));
    setSales(salesData);
  };

  // 연도 또는 월을 선택했을 때 호출되는 함수
  const onChange = (date: dayjs.Dayjs | null) => {
    setSelectedDateTime(date);
    if (date) {
      setSelectedYear(date.year().toString());
    } else {
      setSelectedYear(''); // 초기화
    }
  };

  // 조회 버튼 클릭 시 호출되는 함수
  const onSubmit = () => {
    if (selectedDateTime) {
      fetchPayments();
    } else {
      message.error('연도를 선택해 주세요');
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [selectedYear]);

  const detailPage = (data: number) => {
    router.push(`/sales/salesdetail/${data}`);
  };

  const totalPaymentPrices = sales?.map((item) => item.totalPaymentPrice);
  const counts = sales?.map((item) => item.count);

  const months = Array.from({ length: 12 }, (_, i) => {
    return `${selectedYear}-${String(i + 1).padStart(2, '0')}`; // 'YYYY-MM' 형식으로 반환
  });

  const chartData: ChartData = {
    labels: months,
    datasets: [
      {
        type: 'bar', // 매출액은 막대그래프
        label: '매출액',
        data: totalPaymentPrices,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        yAxisID: 'y-left', // 왼쪽 Y축에 매핑
      },
      {
        type: 'line', // 매출건수는 선그래프
        label: '매출건수',
        data: counts,
        fill: false, // 선 그래프의 내부 채우지 않음
        borderColor: 'rgb(255, 99, 132)', // 선의 색상
        tension: 0.1,
        yAxisID: 'y-right', // 오른쪽 Y축에 매핑
      },
    ],
  };

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
          text: '매출액 (원)', // 왼쪽 Y축 제목
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
          text: '매출건수', // 오른쪽 Y축 제목
        },
        ticks: {
          stepSize: 1,
          callback: (value: any) => {
            return `${Math.floor(value)}`; // 숫자를 그대로 문자열로 반환
          },
        },
        grid: {
          display: false, // 오른쪽 Y축 그리드는 숨김
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: '월별 매출 분석',
      },
    },
  };
  const columns = [
    {
      title: '결제일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a?: any, b?: any) => Number(a.createdAt.replace(/-/g, '')) - Number(b.createdAt.replace(/-/g, '')),
      render: (data: any) => dayjs(data).format('YYYY-MM-DD'),
    },
    {
      title: '결제 방식',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: '결제금액',
      dataIndex: 'paymentPrice',
      key: 'paymentPrice',
      render: (data: any) => data.toLocaleString() + '원',
    },
    {
      title: '쿠폰 사용금액',
      dataIndex: 'couponPrice',
      key: 'couponPrice',
      render: (data: any) => data.toLocaleString() + '원',
    },
    {
      title: '실제 결제 금액',
      dataIndex: 'couponPrice',
      key: 'actualPaymentPrice',
      render: (couponPrice: any, record: any) => (record.paymentPrice - couponPrice).toLocaleString() + '원',
    },
    {
      title: '상세페이지',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => <a onClick={() => detailPage(record.key)}>상세 보기</a>,
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
        <div>
          <Button type="primary" onClick={onSubmit}>
            조회
          </Button>
        </div>
      </div>
      <Chart data={chartData} options={chartOptions} type={'bar'} />
      <p className="title">매출 목록</p>
      <Table columns={columns} dataSource={data} />
    </ChartStyled>
  );
};

export default SalesMonthPage;

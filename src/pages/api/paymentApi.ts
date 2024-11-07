import { CouponData } from '@/types';
import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:4000/api/payment/';

// 전체 결제 조회
export const getAllPayment = async () => {
  try {
    const response = await axios.get(`${API_URL}get-all-payment`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // 서버가 응답을 보냈지만 오류가 발생한 경우
      console.log('서버 응답:', axiosError.response.data);
      console.log('상태 코드:', axiosError.response.status);
    } else {
      // 요청을 보내는 중 오류 발생
      console.log('요청 오류:', axiosError.message);
    }
    throw axiosError;
  }
};

// 특정 결제 조회
export const getOnePayment = async (paymentId: number) => {
  console.log('🚀 ~ getOnePayment ~ paymentId:', paymentId);
  try {
    const response = await axios.get(`${API_URL}get-one-payment`, { params: { paymentId } });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // 서버가 응답을 보냈지만 오류가 발생한 경우
      console.log('서버 응답:', axiosError.response.data);
      console.log('상태 코드:', axiosError.response.status);
    } else {
      // 요청을 보내는 중 오류 발생
      console.log('요청 오류:', axiosError.message);
    }
    throw axiosError;
  }
};

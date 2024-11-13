import { CouponData } from '@/types';
import { BACK_URL } from '@/utill/url';
import axios, { AxiosError } from 'axios';

const API_URL = `${BACK_URL}booking/`;

// 전체 예약 조회
export const getAllBooking = async () => {
  try {
    const response = await axios.get(`${API_URL}get-booking`);
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

// 특정 예약 데이터 조회
export const getOneBooking = async (bookingId: any) => {
  try {
    const response = await axios.get(`${API_URL}get-one-booking`, {
      params: { bookingId },
    });
    return response;
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

// 예약 검색
export const searchBooking = async (search: string) => {
  try {
    const response = await axios.get(`${API_URL}get-search-booking`, { params: { query: search } });
    return response;
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

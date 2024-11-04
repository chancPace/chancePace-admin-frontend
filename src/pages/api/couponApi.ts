import { CouponData } from '@/types';
import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:4000/api/coupon/';

//쿠폰 등록
export const addCoupon = async (values: CouponData) => {
  try {
    const response = await axios.post(`${API_URL}add-coupon`, values);
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

// 전체 쿠폰 데이터 조회
export const getAllCoupon = async () => {
  try {
    const response = await axios.get(`${API_URL}get-all-coupon`);
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

// 특정 쿠폰 데이터 조회
export const getOneCoupon = async (couponId: number) => {
  try {
    const response = await axios.get(`${API_URL}get-one-coupon`, {
      params: { couponId },
    });
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

// 쿠폰 정보 수정 및 삭제
export const updateCoupon = async (values: CouponData) => {
  console.log('🚀 ~ updateSpace ~ spaceData:', values);
  try {
    const response = await axios.patch(`${API_URL}update-coupon`, values);
    console.log('🚀 ~ updateSpace ~ response:', response);
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

// 쿠폰 검색
export const searchCoupon = async (search: string) => {
  console.log('🚀 ~ searchCoupon ~ search:', search);
  try {
    const response = await axios.get(`${API_URL}get-search-coupon`, { params: { query: search } });
    console.log('🚀 ~ searchCoupon ~ response:', response);
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

// 쿠폰 발급
export const sendCoupon = async (values: CouponData) => {
  console.log('🚀 ~ sendCoupon ~ values:', values);
  try {
    const response = await axios.post(`${API_URL}send-coupon`, values);
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

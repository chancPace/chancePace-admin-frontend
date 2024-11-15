import { BACK_URL } from '@/utill/url';
import axios, { AxiosError } from 'axios';

const API_URL = `${BACK_URL}review/`;

export const getAllReview = async () => {
  try {
    const response = await axios.get(`${API_URL}get-all-review-admin`);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.log('서버 응답:', axiosError.response.data);
      console.log('상태 코드:', axiosError.response.status);
    } else {
      console.log('요청 오류:', axiosError.message);
    }
    throw axiosError;
  }
};

export const getReview = async () => {
  try {
    const response = await axios.get(`${API_URL}get-all-review`);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.log('서버 응답:', axiosError.response.data);
      console.log('상태 코드:', axiosError.response.status);
    } else {
      console.log('요청 오류:', axiosError.message);
    }
    throw axiosError;
  }
};

// 리뷰 상세
export const getOneReview = async (reviewId: number) => {
  try {
    const response = await axios.get(`${API_URL}get-one-review`, {
      params: { reviewId },
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.log('서버 응답:', axiosError.response.data);
      console.log('상태 코드:', axiosError.response.status);
    } else {
      console.log('요청 오류:', axiosError.message);
    }
    throw axiosError;
  }
};

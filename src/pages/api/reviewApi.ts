import { Review } from '@/types';
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

export const updateReview = async (reviewId: number, reviewData: Partial<Review>) => {
  try {
    const response = await axios.patch(`${API_URL}update-review`, {
      reviewId,
      ...reviewData,
    });
    return response.data;
  } catch (error) {
    console.error('리뷰 수정 실패', error);
    throw error;
  }
};

export const updateRatingBySpace = async (spaceId: number) => {
  try {
    const response = await axios.patch(`${API_URL}/update-rating-by-space`, {
      spaceId,
    });
    return response.data;
  } catch (error) {
    console.error('별점 평균 업데이트 실패', error);
    throw error;
  }
};

import { BACK_URL } from '@/utill/url';
import axios, { AxiosError } from 'axios';

const API_URL = `${BACK_URL}category/`;

// 카테고리 추가
export const AddCategory = async (categoryName: any) => {
  try {
    const response = await axios.post(`${API_URL}add-category`, categoryName);
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

// 카테고리 조회
export const getCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}get-category`);
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

// 카테고리 수정
export const updateCategory = async (req: any) => {
  try {
    const response = await axios.patch(`${API_URL}update-category`, req);
    // console.log('getcategory', response.data);

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

// 카테고리 삭제
export const removeCategory = async (req: any) => {
  try {
    const response = await axios.delete(`${API_URL}remove-category`, {
      data: {
        id: req,
      },
    });
    console.log('제거 완료', response.data);

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

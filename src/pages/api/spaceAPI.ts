import { AllowSpace, Space } from '@/types';
import { BACK_URL } from '@/utill/url';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie'; // 쿠키 라이브러리 추가

const API_URL = `${BACK_URL}space/`;

// 공간 등록
export const addNewSpace = async (spaceData: FormData) => {
  try {
    const token = Cookies.get('adminToken'); // 쿠키에 저장된 'token' 이름으로 가져옴
    const response = await axios.post(`${API_URL}add-new-space`, spaceData, {
      headers: {
        'Content-Type': 'multipart/form-data', // FormData 전송을 위한 헤더 설정
        Authorization: `Bearer ${token}`, // 가져온 토큰을 Authorization 헤더에 추가
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('공간 등록 실패', error.response?.data || error.message);
    throw error;
  }
};

// 전체 공간 데이터 조회
export const getAllSpace = async () => {
  try {
    const response = await axios.get(`${API_URL}get-space`);
    return response.data;
  } catch (error: any) {
    console.error('공간 조회 실패', error.response?.data || error.message);
    throw error;
  }
};

// 특정 공간 데이터 조회
export const getOneSpace = async (spaceId: any) => {
  try {
    const response = await axios.get(`${API_URL}get-one-space`, {
      params: { spaceId },
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

// 공간 정보 수정 및 삭제
export const updateSpace = async (spaceData: Space) => {
  try {
    const response = await axios.patch(`${API_URL}update-space`, spaceData);
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

export const updatesSpace = async (spaceData: FormData, spaceId: string) => {
  try {
    const token = Cookies.get('admintoken');
    const response = await axios.patch(`${API_URL}/update-space?spaceId=${spaceId}`, spaceData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response, '리스펀스 api');
    return response.data;
  } catch (error) {
    console.error('공간 수정 실패', error);
    throw error;
  }
};

// 공간 검색
export const searchSpace = async (search: string) => {
  try {
    const response = await axios.get(`${API_URL}get-search-space`, { params: { query: search } });
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

export const allowSpace = async (value: AllowSpace) => {
  try {
    const response = await axios.patch(`${API_URL}/update-space-status`, value);
    return response.data;
  } catch (error) {
    console.error('공간 수정 실패', error);
    throw error;
  }
};

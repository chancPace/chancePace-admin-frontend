import axios, { AxiosError } from 'axios';
import { Space } from '@/types';

const API_URL = 'http://localhost:4000/api/space/';

// 전체 공간 등록
export const addSpace = async (spaceData: Space) => {
  try {
    const response = await axios.post(`${API_URL}add-new-space`, spaceData);
  } catch (error) {}
};

// 전체 공간 조회
export const getAllSpace = async () => {
  try {
    const response = await axios.get(`${API_URL}get-space`);
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

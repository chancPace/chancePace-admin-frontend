import { AddUserData, LoginData, oneUserData, SignupData, User } from '@/types';
import { BACK_URL } from '@/utill/url';
import axios, { AxiosError } from 'axios';

const API_URL = `${BACK_URL}user/`;

export const getUser = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('API 요청 실패: ', error);
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 404:
          throw new Error('404:요청한 리소스를 찾을 수 없습니다');
        case 401:
          throw new Error('401: 인증에 실패했습니다. 다시 로그인하세요');
        case 500:
          throw new Error('500: 서버 오류가 발생했습니다. 나중에 다시 시도하세요');
        default:
          throw new Error('알 수 없는 오류가 발생했습니다. ');
      }
    } else {
      throw new Error('네트워크 문제로 요청을 완료할 수 없습니다.');
    }
  }
};

interface ErrorResponseData {
  message: string;
}
export const postSignup = async (userData: SignupData) => {
  try {
    //axios.post(): 첫번째-> url, 두번째 -> 보낼 데이터
    const response = await axios.post(`${API_URL}signup`, userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseData>;
    console.log(error);

    if (axiosError.response) {
      alert(`서버 오류 발생: ${axiosError.response.data.message}`);
    } else if (axiosError.request) {
      alert('서버 응답이 없습니다.');
    } else {
      alert('요청 처리 중 오류가 발생했습니다.');
    }

    throw error; // 오류를 다시 던져서 상위에서 처리하게 할 수 있음
  }
};

export const postLogin = async (userData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log('로그인 요청 중 오류', axiosError.message);
    throw axiosError;
  }
};

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${API_URL}get-all-user`);
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

export const addUser = async (userData: AddUserData) => {
  try {
    //axios.post(): 첫번째-> url, 두번째 -> 보낼 데이터
    const response = await axios.post(`${API_URL}signup`, userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseData>;

    if (axiosError.response) {
      alert(`서버 오류 발생: ${axiosError.response.data.message}`);
    } else if (axiosError.request) {
      alert('서버 응답이 없습니다.');
    } else {
      alert('요청 처리 중 오류가 발생했습니다.');
    }

    throw error; // 오류를 다시 던져서 상위에서 처리하게 할 수 있음
  }
};

export const getOneUser = async ({ userId }: oneUserData) => {
  try {
    const response = await axios.get(`${API_URL}get-one-user`, {
      params: { userId },
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

export const updateOneUser = async (userData: User) => {
  try {
    const response = await axios.patch(`${API_URL}update-user`, userData);
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

export const searchUser = async (search: string) => {
  try {
    const response = await axios.get(`${API_URL}get-search-user`, { params: { query: search } });
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

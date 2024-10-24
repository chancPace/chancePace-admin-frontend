import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:4000/api/category/';

export const AddCategory = async (categoryName: any) => {
  try {
    const response = await axios.post(`${API_URL}add-category`, categoryName);
    console.log('category', response.data);

    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.message);
    throw axiosError;
  }
};

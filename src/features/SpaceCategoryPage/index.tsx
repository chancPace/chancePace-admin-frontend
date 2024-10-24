import { AddCategory } from '@/pages/api/spaceAPI';
import { Button, Form, Input } from 'antd';
import { AxiosError } from 'axios';

const SpaceCategoryPage = () => {
  const handleCategory = async (values: any) => {
    const { categoryName } = values;
    try {
      const response = await AddCategory({ categoryName });
    } catch (error) {
      const axiosError = error as AxiosError;
    }
  };

  return (
    <Form
      name="categoryName"
      onFinish={handleCategory} // onFinish 이벤트 핸들러 등록
    >
      <Form.Item
        name="categoryName" // name과 일치해야 함
        label="카테고리"
        rules={[{ required: true, message: '카테고리를 입력하세요!' }]} // 유효성 검사
      >
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        등록
      </Button>
    </Form>
  );
};

export default SpaceCategoryPage;

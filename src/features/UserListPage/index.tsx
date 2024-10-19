import Tables from '@/components/tables';
import { Button, Input, Select } from 'antd';
import { useFormik } from 'formik';

const UserListPage = () => {
  const formik = useFormik({
    initialValues: {
      ranking: '',
      gender: '',
      region: '',
      type: '',
      text: '',
    },
    onSubmit: (values) => {
      alert(`${values.ranking} + ${values.gender} + ${values.region} + ${values.type} + ${values.text}`);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label>회원 등급</label>
        <Select
          allowClear
          placeholder="등급을 선택하세요"
          onChange={(value) => formik.setFieldValue('ranking', value)}
          style={{ width: '100%' }}
          options={[
            { value: 'silver', label: <span>silver</span> },
            { value: 'gold', label: <span>gold</span> },
            { value: 'bronze', label: <span>bronze</span> },
            { value: 'platinum', label: <span>platinum</span> },
          ]}
        />
        <label>성별</label>
        <Select
          allowClear
          placeholder="성별을 선택하세요"
          onChange={(value) => formik.setFieldValue('gender', value)}
          style={{ width: '100%' }}
          options={[
            { value: '남자', label: <span>남자</span> },
            { value: '여자', label: <span>여자</span> },
          ]}
        />
        <label>지역</label>
        <Select
          allowClear
          placeholder="지역을 선택하세요"
          onChange={(value) => formik.setFieldValue('region', value)}
          style={{ width: '100%' }}
          options={[
            { value: '서울', label: <span>서울</span> },
            { value: '경기', label: <span>경기</span> },
            { value: '인천', label: <span>인천</span> },
            { value: '강원도', label: <span>강원도</span> },
            { value: '충청도', label: <span>충청도</span> },
            { value: '전라도', label: <span>전라도</span> },
            { value: '경상도', label: <span>경상도</span> },
            { value: '제주도', label: <span>제주도</span> },
          ]}
        />
        <Select
          allowClear
          placeholder="구분"
          onChange={(value) => formik.setFieldValue('type', value)}
          style={{ width: '100px' }}
          options={[
            { value: '이름', label: <span>이름</span> },
            { value: '성별', label: <span>성별</span> },
            { value: '지역', label: <span>지역</span> },
          ]}
        />
        <Input name="text" onChange={formik.handleChange} value={formik.values.text} />
        <Button htmlType="submit">검색</Button>
      </form>
      <Tables />
    </>
  );
};
export default UserListPage;

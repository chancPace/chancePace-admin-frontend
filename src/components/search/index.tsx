import { Button } from 'antd';
import { useFormik } from 'formik';
import SelectComponent from '../select';
import SearchStyle from './style';
import InputComponent from '../input';

interface SearchProps {
  labelList?: any;
}

const Search = ({ labelList }: SearchProps) => {
  const formik = useFormik({
    initialValues: { result: [] },
    onSubmit: (values) => {
      console.log(values);
      alert(values.result.join(', '));
    },
  });
  const handleSelectChange = (value: string, index: number) => {
    // 선택된 값을 result 배열에 추가
    formik.setFieldValue(`result.${index}`, value);
  };

  return (
    <SearchStyle>
      <form className="wrap" onSubmit={formik.handleSubmit}>
        <div className="left">
          <div className="left_top">
            {labelList?.map((label: string, i: number) => {
              return (
                <div key={i + 'label'}>
                  <p>{label}</p>
                  <SelectComponent
                    label={label}
                    formik={formik}
                    onChange={(value: any) => handleSelectChange(value, i)}
                  />
                </div>
              );
            })}
          </div>
          <div className="left_bottom">
            <InputComponent />
          </div>
        </div>
        <div className="right">
          <Button htmlType="submit">검색하기</Button>
        </div>
      </form>
    </SearchStyle>
  );
};

export default Search;

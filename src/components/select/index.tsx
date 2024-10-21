import { Select } from 'antd';

interface SelectProps {
  label?: any;
  formik?: any;
  onChange?: any;
}

const SelectComponent = ({ label, formik, onChange }: SelectProps) => {
  return (
    <Select
      allowClear
      placeholder={`${label}을 선택하세요`}
      onChange={(value) => {
        formik.setFieldValue(label, value); // Formik의 상태 업데이트
        if (onChange) onChange(value); // 선택된 값에 대해 추가 처리
      }}
      options={[
        { value: 'silver', label: <span>silver</span> },
        { value: 'gold', label: <span>gold</span> },
        { value: 'bronze', label: <span>bronze</span> },
        { value: 'platinum', label: <span>platinum</span> },
      ]}
    />
  );
};

export default SelectComponent;

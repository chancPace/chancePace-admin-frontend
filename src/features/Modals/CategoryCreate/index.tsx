import { useFormik } from 'formik';
import { CategoryCreateStyled } from './style';
import { Button, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { AddCategory, updateCategory } from '@/pages/api/categoryApi';

interface optionProps {
  options: any;
  selectID: number;
  selectData: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
}

const CategoryCreate = ({ options, selectID, selectData, setIsModalOpen }: optionProps) => {
  //  선택한 옵션 저장
  const [select, setSelect] = useState<any>();
  const category = useFormik({
    initialValues: {
      categoryName: '',
    },
    onSubmit: (values) => {
      Modal.confirm({
        title: selectID === 0 ? '등록하시겠습니까?' : '수정하시겠습니까?',
        okText: '확인',
        cancelText: '취소',
        onOk: async () => {
          try {
            if (selectID === 0) {
              // 카테고리 등록
              await AddCategory({
                categoryName: values.categoryName,
                pId: select, // 선택한 상위 카테고리 ID
              });
              console.log('카테고리 등록 완료');
            } else {
              // 카테고리 수정
              await updateCategory({
                categoryName: values.categoryName,
                pId: select, // 선택한 상위 카테고리 ID
              });
              console.log('카테고리 수정 완료');
            }
            // 모달 닫기
            setIsModalOpen(false);
            // 폼 초기화
            category.resetForm();
          } catch (error) {
            console.error(error, '오류 발생');
          }
        },
      });
    },
  });

  useEffect(() => {
    if (selectID !== 0 && selectData) {
      category.setFieldValue('categoryName', selectData?.categoryName);
      setSelect(String(selectData?.pId || '없음'));
    } else {
      category.setFieldValue('categoryName', '');
      setSelect(null); // 선택 초기화
    }
  }, [selectID, selectData]); // selectData를 의존성 배열에 추가

  return (
    <CategoryCreateStyled>
      <form onSubmit={category.handleSubmit}>
        <div className="inputForm">
          <div>카테고리 이름</div>
          <Input
            placeholder="카테고리 이름을 입력해 주세요."
            name="categoryName"
            onChange={category.handleChange}
            value={category.values.categoryName}
          />
        </div>
        <div className="inputForm">
          <div>상위 선택</div>
          <Select
            options={options}
            defaultValue={select}
            value={select}
            onChange={(value: string) => {
              setSelect(value);
            }}
          />
        </div>
        <div className="btn">
          <Button htmlType="submit">{selectID === 0 ? '등록' : '수정'}</Button>
        </div>
      </form>
    </CategoryCreateStyled>
  );
};
export default CategoryCreate;

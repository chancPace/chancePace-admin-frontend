import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Table } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getCategory, removeCategory } from '@/pages/api/categoryApi';
import CategoryCreate from '../Modals/CategoryCreate';

import { Category } from '@/types';
import { SpaceCategoryStyled, TableButtonStyle, CategoryStyle } from './style'; // style 추가
import router from 'next/router';

const SpaceCategoryPage = () => {
  // 전체 카테고리 데이터
  const [alldata, setAllData] = useState([]);

  // 요청 카테고리 데이터
  const [maindata, setMainData] = useState([]);

  // 선택한 카테고리 ID
  const [selectID, setSelectID] = useState(0);
  // select 옵션 설정
  const [options, setOptions] = useState<any>();

  // 선택된 카테고리 데이터
  const [selectData, setSelectData] = useState<Category>();
  // 모달 열기
  const [isModalOpen, setIsModalOpen] = useState(false);

  // DB에 있는 데이터 가져오기
  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      const categories = response?.data?.data;
      const mainCategory = categories.filter((x: Category) => x.pId === null);
      const alldataWithKeys = categories.map((item: Category) => ({ ...item, key: item.id }));
      const maindataWithKeys = mainCategory.map((item: Category) => ({ ...item, key: item.id }));
      setMainData(maindataWithKeys);
      setAllData(alldataWithKeys);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [isModalOpen]);

  // select Option 설정
  useEffect(() => {
    const result = maindata?.map((item: any) => ({
      value: String(item.id),
      label: item.categoryName,
    }));
    const option = [{ value: null, label: '없음' }, ...result];
    setOptions(option);
  }, [maindata]);

  // 선택한 카테고리 데이터
  useEffect(() => {
    const _data = alldata?.find((item: any) => item?.id === selectID);
    setSelectData(_data);
  }, [selectID]);

  useEffect(() => {
    if (isModalOpen === false) {
      setSelectID(0);
    }
  }, [isModalOpen]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteConfirm = (target: string) => {
    const targetCategory: any = alldata?.find((item: any) => item.id === Number(target));
    const isBig = targetCategory?.pId === null ? true : false;
    const content = isBig ? '소분류가 존재시 함께 삭제됩니다. 정말로 삭제하시겠습니까?' : '정말로 삭제하시겠습니까?';

    Modal.confirm({
      title: '카테고리 삭제',
      icon: <ExclamationCircleFilled />,
      content: '삭제하시겠습니까?',
      okText: '네',
      okType: 'danger',
      cancelText: '아니요',
      onOk() {
        Modal.confirm({
          title: `삭제 재확인`,
          icon: <ExclamationCircleFilled />,
          content: content,
          okText: '네',
          okType: 'danger',
          cancelText: '아니요',
          onOk: async () => {
            try {
              await removeCategory(Number(target));
              message.info('삭제 성공');
              fetchCategories();
            } catch (error) {
              message.error('삭제 실패');
            }
          },
          onCancel() {
            setIsModalOpen(false);
          },
        });
      },
      onCancel() {
        setIsModalOpen(false);
      },
    });
  };

  const columns = [
    {
      title: '대분류',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '수정 및 삭제',
      render: (data: any) => {
        return (
          <TableButtonStyle>
            <Button
              className="big_fix"
              onClick={() => {
                setSelectID(data?.id);
                setIsModalOpen(true);
              }}
            >
              수정
            </Button>
            <Button
              onClick={() => {
                setSelectID(data?.id);
                showDeleteConfirm(data?.id);
              }}
            >
              삭제
            </Button>
          </TableButtonStyle>
        );
      },
    },
  ];

  return (
    <SpaceCategoryStyled>
      <div className="top">
        <p>카테고리 목록</p>
        <div>
          <Button
            className="register"
            type="primary"
            onClick={() => {
              setSelectID(0);
              setIsModalOpen(true);
            }}
          >
            등록
          </Button>
        </div>
      </div>
      <Modal
        width={400}
        title="카테고리"
        open={isModalOpen}
        onOk={() => handleOk}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <CategoryCreate
          options={options}
          selectID={selectID}
          selectData={selectData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={maindata}
        expandable={{
          expandedRowRender: (record: any) => {
            const subCategory = alldata?.filter((x: Category) => x.pId == record.id);
            const result = subCategory.map((item: Category) => ({ ...item, key: item.id }));
            return (
              <CategoryStyle>
                {result.length > 0 ? (
                  <ul>
                    {result.map((item: any, i: number) => (
                      <div key={item.key} className="category-group">
                        <div className="category-header">
                          <span className="category-name">{item.categoryName}</span>
                        </div>
                        <div className="buttons">
                          <Button
                            className="sub_fix"
                            onClick={() => {
                              setSelectID(item?.id);
                              setIsModalOpen(true);
                            }}
                          >
                            수정
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectID(item?.id);
                              showDeleteConfirm(item?.id);
                            }}
                          >
                            삭제
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </CategoryStyle>
            );
          },
        }}
      />
    </SpaceCategoryStyled>
  );
};

export default SpaceCategoryPage;

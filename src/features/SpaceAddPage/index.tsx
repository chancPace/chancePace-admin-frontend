import { AddSpaceStyled } from './style';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Category } from '../../types';
import { Form, Input, Button, Select, InputNumber, Switch, Upload, UploadFile, message } from 'antd';
import { addNewSpace, getOneSpace, updateSpace, updatesSpace } from '@/pages/api/spaceAPI';
const { TextArea } = Input;
import { getCategory } from '@/pages/api/categoryApi';
import { useRouter } from 'next/router';
import { getAllUser } from '@/pages/api/userApi';

const SpaceAddPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { spaceId } = router.query;
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryOption, setCategoryOption] = useState<any>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [startHour, setStartHour] = useState<number | null>(null);
  const [fileError, setFileError] = useState<string | null>(null); // 파일 오류 메시지 상태 추가
  const [user, setUser] = useState<any>();
  const [userOption, setUserOption] = useState();

  const isEditMode = !!spaceId;

  //00부터 24까지의 시간 생성(영업시간)
  const timeOption = Array.from({ length: 25 }, (_, i) => ({
    label: i.toString().padStart(2, '0') + ':00',
    value: i,
  }));

  //카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategory();
        setCategories(categoriesData.data.data);
      } catch (error) {
        message.error('카테고리 목록을 불러오는 데 실패했습니다.');
      }
    };
    const fetchUser = async () => {
      try {
        const response = await getAllUser();
        setUser(response.data.data);
        // console.log('🚀 ~ fetchUser ~ response:', response);
        const users = response?.data?.data?.map((x: any, i: number) => ({
          label: x.userName,
          value: x.userName,
        }));
        setUserOption(users);
      } catch (error) {
        message.error('회원 목록을 불러오는 데 실패했습니다.');
      }
    };
    fetchCategories();
    fetchUser();
  }, []);

  //select -> option 카테고리 대분류,소분류 분류하여 나타내기
  useEffect(() => {
    if (categories) {
      const categoryOptions = categories
        ?.filter((category) => category.pId === null)
        ?.map((parentCategory) => ({
          label: `--- ${parentCategory.categoryName} ---`, // 대분류 이름
          options: categories
            ?.filter((subCategory) => Number(subCategory.pId) === parentCategory.id)
            ?.map((subCategory) => ({
              label: subCategory.categoryName, // 소분류 이름
              value: subCategory.id,
            })),
        }));
      setCategoryOption(categoryOptions);
    }
  }, [categories]);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
    // 파일이 추가되면 오류 메시지를 초기화
    if (fileList.length > 0) {
      setFileError(null);
    }
  };

  //데이터 전송
  const handleSubmit = async (values: any) => {
    if (fileList.length === 0) {
      setFileError('이미지는 최소 1장 이상 업로드해야 합니다.');
      return; // 파일이 없을 경우 제출 중단
    }

    const formData = new FormData();
    // 일반 데이터 추가
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    // 파일 데이터 추가
    fileList.forEach((file) => {
      formData.append('image', file.originFileObj as Blob);
    });

    if (isEditMode) {
      formData.append('spaceId', spaceId as string);
    }

    try {
      if (isEditMode) {
        formData.append('spaceId', String(spaceId));
        await updatesSpace(formData, String(spaceId));
        message.success('공간 수정 성공');
      } else {
        await addNewSpace(formData);
        message.success('공간 등록 성공');
      }
      form.resetFields();
      setFileList([]);
      router.push('/space/spacelist');
    } catch (error) {
      message.error(isEditMode ? '공간 수정 실패' : '공간 등록 실패');
    }
  };

  //파일 URL 디코딩 함수
  const decodeUrl = (url: string) => {
    try {
      return decodeURIComponent(url);
    } catch (error) {
      console.error('디코딩 에러: ', error);
      return url; // 디코딩 오류 발생 시 원본 URL 반환
    }
  };

  //수정 해당 공간의 데이터 불러오기
  useEffect(() => {
    // 수정할 공간의 데이터 불러오기
    const fetchSpaceData = async () => {
      if (spaceId) {
        try {
          const id = Array.isArray(spaceId) ? spaceId[0] : spaceId; // spaceId가 배열일 경우 첫 번째 요소를 사용
          const response = await getOneSpace(id);
          const spaceData = response.data;
          //FIXME -
          // 기존 이미지가 있는 경우 fileList에 추가
          const existingFiles =
            spaceData.images?.map((image: { imageUrl: string }) => ({
              url: decodeUrl(image.imageUrl) || '', // 이미지 URL이 없을 경우 빈 문자열로 처리
              status: 'done', // 업로드된 이미지로 간주
            })) || [];

          form.setFieldsValue({
            ...form.getFieldsValue(), // 기존 폼의 값들
            ...spaceData, // 서버에서 가져온 데이터로 덮어쓰기
          });

          setFileList(existingFiles);
        } catch (error) {
          message.error('공간 정보를 불러오는 데 실패했습니다.');
        }
      }
    };
    fetchSpaceData();
  }, [spaceId, form]);

  const handleUser = (value: any) => {
    const targetUser = user?.find((x: any) => x.userName === value);
    const phoneNumber = targetUser?.phoneNumber;
    if (phoneNumber) {
      form.setFieldsValue({ spaceAdminPhoneNumber: phoneNumber });
    } else {
      form.setFieldsValue({ spaceAdminPhoneNumber: '' });
    }
  };

  return (
    <AddSpaceStyled>
      <p>공간정보를 입력해주세요</p>
      <Form
        className="form"
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
        initialValues={{
          spaceName: '공간 타이틀',
          spaceLocation: '서울시 마포구',
          description: '설명입니다',
          spacePrice: 10000,
          discount: 2000,
          amenities: '편의시설입니다',
          spaceStatus: 'AVAILABLE',
          isOpen: true,
          guidelines: '주의사항입니다',
          minGuests: 1,
          maxGuests: 3,
          cleanTime: 0,
          businessStartTime: '',
          businessEndTime: '',
          categoryId: '',
          addPrice: 2000,
          spaceAdminName: '',
          spaceAdminPhoneNumber: '',
        }}
      >
        <Form.Item
          label="제목"
          name="spaceName"
          rules={[
            {
              required: true,
              message: '제목을 입력해주세요.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="위치"
          name="spaceLocation"
          rules={[
            {
              required: true,
              message: '위치를 입력해주세요.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="카테고리" name="categoryId" rules={[{ required: true, message: '카테고리를 선택해주세요' }]}>
          <Select placeholder="카테고리를 선택해주세요" options={categoryOption} />
        </Form.Item>
        <Form.Item
          label="공간 소개"
          name="description"
          rules={[
            {
              required: true,
              message: '공간 소개를 입력해주세요',
            },
          ]}
        >
          <TextArea rows={4} className="custom-textarea" />
        </Form.Item>
        <Form.Item
          label="가격"
          name="spacePrice"
          rules={[
            {
              required: true,
              message: '가격을 입력해주세요',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="할인금액" name="discount">
          <InputNumber />
        </Form.Item>
        <Form.Item label="인당 추가요금" name="addPrice">
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="시설 안내"
          name="amenities"
          rules={[
            {
              required: true,
              message: '시설 안내를 입력해주세요',
            },
          ]}
        >
          <TextArea rows={2} name="amenities" className="custom-textarea" />
        </Form.Item>
        <Form.Item
          label="예약시 주의사항"
          name="guidelines"
          rules={[
            {
              required: true,
              message: '주의사항을 입력해주세요',
            },
          ]}
        >
          <TextArea rows={2} name="caution" className="custom-textarea" />
        </Form.Item>
        <Form.Item
          label="청소시간"
          name="cleanTime"
          rules={[
            {
              required: true,
              message: '청소 시간을 입력해주세요',
            },
          ]}
        >
          <Select>
            <Select.Option value="1">1시간</Select.Option>
            <Select.Option value="2">2시간</Select.Option>
            <Select.Option value="3">3시간</Select.Option>
            <Select.Option value="4">4시간</Select.Option>
            <Select.Option value="5">5시간</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="공개여부" valuePropName="checked" name="isOpen">
          <Switch />
        </Form.Item>
        <Form.Item
          label="최소 인원"
          name="minGuests"
          rules={[
            {
              required: true,
              message: '인원수를 입력해주세요',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="최대 인원"
          name="maxGuests"
          rules={[
            {
              required: true,
              message: '최대 인원을 입력해주세요.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const minGuests = getFieldValue('minGuests');
                if (minGuests === undefined || value >= minGuests) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('최대 인원은 최소 인원보다 크거나 같아야 합니다.'));
              },
            }),
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="영업 시작 시간"
          name="businessStartTime"
          rules={[{ required: true, message: '영업 시작 시간을 선택해주세요' }]}
        >
          <Select
            options={timeOption}
            placeholder="시작 시간을 선택하세요"
            onChange={(value) => {
              setStartHour(value); // 선택된 시작 시간 상태로 저장
              form.setFieldsValue({ businessEndTime: null }); // 종료 시간 초기화
            }}
          />
        </Form.Item>
        <Form.Item
          label="영업 종료 시간"
          name="businessEndTime"
          rules={[
            { required: true, message: '영업 종료 시간을 선택해주세요' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const startValue = getFieldValue('businessStartTime');
                if (value !== null && startValue !== null && value > startValue) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('종료 시간은 시작 시간보다 이후여야 합니다.'));
              },
            }),
          ]}
        >
          <Select
            options={timeOption.filter((opt) => opt.value > (startHour ?? -1))}
            placeholder="종료 시간을 선택하세요"
            disabled={startHour === null} // 시작 시간이 선택되지 않았을 때 비활성화
          />
        </Form.Item>

        <Form.Item label="공간 상태" name="spaceStatus">
          <Select>
            <Select.Option value="AVAILABLE">사용 가능</Select.Option>
            <Select.Option value="UNAVAILABLE">사용 불가</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          help={fileError} // 오류 메시지 출력
          validateStatus={fileError ? 'error' : undefined} // 검증 상태 설정
        >
          <Upload
            //FIXME - 기존 이미지 가져오게 수정하기
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/');
              if (!isImage) {
                message.error('이미지 파일만 업로드 가능합니다.');
                return Upload.LIST_IGNORE;
              }
              return isImage;
            }}
            showUploadList={{
              showPreviewIcon: false,
              showRemoveIcon: true,
            }}
            itemRender={(originNode) => React.cloneElement(originNode, { title: null })}
          >
            {fileList.length >= 8 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="호스트이름"
          name="spaceAdminName"
          rules={[
            {
              required: true,
              message: '호스트 이름을 입력해주세요',
            },
          ]}
        >
          <Select
            placeholder="호스트 이름을 입력하세요"
            allowClear
            options={userOption}
            onChange={(value) => handleUser(value)}
          />
        </Form.Item>
        <Form.Item
          label="호스트 전화번호"
          name="spaceAdminPhoneNumber"
          rules={[
            {
              required: true,
              message: '전화번호를 입력해주세요(-포함)',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="btn-box">
          <Button type="primary" htmlType="submit">
            {isEditMode ? '수정하기' : '등록하기'} {/* 버튼 텍스트 변경 */}
          </Button>
        </Form.Item>
      </Form>
    </AddSpaceStyled>
  );
};

export default SpaceAddPage;

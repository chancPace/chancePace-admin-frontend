import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Category } from '../../types';
import { Form, Input, Button, Select, InputNumber, Switch, Upload, UploadFile, message } from 'antd';
import { addNewSpace, getOneSpace, updatesSpace } from '@/pages/api/spaceAPI';
const { TextArea } = Input;
import { getCategory } from '@/pages/api/categoryApi';
import { useRouter } from 'next/router';
import KakaoMapAddress from '@/components/KakaoMapAddress';
import { getAllUser } from '@/pages/api/userApi';
import { AddSpaceStyled } from './style';

const SpaceAddPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { spaceId } = router.query;
  const [categories, setCategories] = useState<Category[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [startHour, setStartHour] = useState<number | null>(null);
  const [fileError, setFileError] = useState<string | null>(null); // 파일 오류 메시지 상태 추가
  const [user, setUser] = useState<any>();
  const [userOption, setUserOption] = useState();
  const [addValue, setAddValue] = useState<string>('');
  const isEditMode = !!spaceId;

  // 카카오맵에서 전달받은 주소를 폼에 설정
  const handleSelectAddress = (address: string) => {
    form.setFieldsValue({ spaceLocation: address });
    setAddValue(address);
  };

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
  const categoryOptions = categories
    .filter((category) => category.pId === null)
    .map((parentCategory) => ({
      label: `--- ${parentCategory.categoryName} ---`, // 대분류 이름
      options: categories
        .filter((subCategory) => Number(subCategory.pId) === parentCategory.id)
        .map((subCategory) => ({
          label: subCategory.categoryName, // 소분류 이름
          value: subCategory.id,
        })),
    }));

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    fileList.forEach((file) => {
      if (!file.originFileObj) {
        message.error('이미지 파일을 다시 확인해주세요.');
      }
    });
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

  // 기존 이미지 불러오는 로직 수정
  const fetchFileFromUrl = async (url: string): Promise<UploadFile<any>> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const fileName = url.split('/').pop() || 'image.jpg';
      const file = new File([blob], fileName, { type: blob.type });

      return {
        uid: url,
        name: fileName,
        status: 'done',
        url: url,
        originFileObj: file,
      } as UploadFile<any>;
    } catch (error) {
      console.error('Failed to fetch file:', error);
      throw error;
    }
  };

  //수정 해당 공간의 데이터 불러오기
  useEffect(() => {
    const fetchSpaceData = async () => {
      if (spaceId) {
        try {
          const id = Array.isArray(spaceId) ? spaceId[0] : spaceId; // spaceId가 배열일 경우 첫 번째 요소를 사용
          const response = await getOneSpace(id);
          const spaceData = response.data.data;
          // 기존 이미지가 있는 경우 fileList에 추가
          const existingFiles = await Promise.all(
            spaceData.images?.map(async (image: { imageUrl: string }) => {
              return fetchFileFromUrl(image.imageUrl);
            }) || []
          );
          form.setFieldsValue({
            ...spaceData,
            spaceLocation: spaceData.spaceLocation,
            spaceAdminPhoneNumber: formatPhoneNumber(spaceData.spaceAdminPhoneNumber),
          });

          setAddValue(spaceData.spaceLocation);
          handleSelectAddress(spaceData.spaceLocation);
          setFileList(existingFiles);
        } catch (error) {
          message.error('공간 정보를 불러오는 데 실패했습니다.');
        }
      }
    };
    fetchSpaceData();
  }, [spaceId, form]);

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length === 11) {
      return cleaned.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
    }

    return phoneNumber;
  };

  const handleUser = (value: any) => {
    const targetUser = user?.find((x: any) => x.userName === value);
    const phoneNumber = targetUser?.phoneNumber;
    if (phoneNumber) {
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      form.setFieldsValue({ spaceAdminPhoneNumber: formattedPhoneNumber });
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
          spaceName: '',
          spaceLocation: '',
          spaceLocationDetail: '',
          description: '',
          spacePrice: '',
          discount: '',
          amenities: '',
          spaceStatus: 'AVAILABLE',
          isOpen: true,
          guidelines: '',
          minGuests: '',
          maxGuests: '',
          cleanTime: '',
          businessStartTime: '',
          businessEndTime: '',
          categoryId: '',
          addPrice: '',
          spaceAdminName: '',
          spaceAdminPhoneNumber: '',
        }}
      >
        <Form.Item
          label="공간 명"
          name="spaceName"
          rules={[
            {
              required: true,
              message: '공간 명을 입력해 주세요.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="주소"
          name="spaceLocation"
          rules={[
            {
              required: true,
              message: '주소를 입력해 주세요.',
            },
          ]}
        >
          <KakaoMapAddress
            addValue={addValue}
            setAddValue={setAddValue}
            onSelectAddress={(address) => form.setFieldsValue({ spaceLocation: address })}
          />
        </Form.Item>
        <Form.Item label="상세주소" name="spaceLocationDetail">
          <Input placeholder="상세주소를 입력해 주세요" />
        </Form.Item>
        <Form.Item label="카테고리" name="categoryId" rules={[{ required: true, message: '카테고리를 선택해주세요' }]}>
          <Select placeholder="카테고리를 선택해 주세요" options={categoryOptions} />
        </Form.Item>
        <Form.Item
          label="공간 소개"
          name="description"
          rules={[
            {
              required: true,
              message: '공간 소개를 입력해 주세요',
            },
          ]}
        >
          <TextArea rows={4} className="custom-textarea" />
        </Form.Item>
        <Form.Item
          label="가격 (시간당)"
          name="spacePrice"
          rules={[
            {
              required: true,
              message: '가격을 입력해 주세요',
            },
            {
              type: 'number',
              min: 1,
              message: '가격은 1원 이상이여햐 합니다.',
            },
          ]}
        >
          <InputNumber placeholder="시간당 이용금액을 작성해 주세요" />
        </Form.Item>
        <Form.Item
          label="할인금액"
          name="discount"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const price = getFieldValue('spacePrice');
                if (value !== undefined && value > price) {
                  return Promise.reject(new Error('할인금액은 가격 이하이어야 합니다.'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <InputNumber placeholder="할인금액을 작성해 주세요" />
        </Form.Item>
        <Form.Item label="인당 추가요금" name="addPrice">
          <InputNumber placeholder="인원 추가비용을 작성해 주세요" />
        </Form.Item>
        <Form.Item
          label="시설 안내"
          name="amenities"
          rules={[
            {
              required: true,
              message: '시설 안내를 입력해 주세요',
            },
          ]}
        >
          <TextArea rows={2} name="amenities" className="custom-textarea" placeholder="시설 안내를 작성해 주세요" />
        </Form.Item>
        <Form.Item name="spaceStatus" hidden initialValue="UNAVAILABLE">
          <Input />
        </Form.Item>
        <Form.Item
          label="예약시 주의사항"
          name="guidelines"
          rules={[
            {
              required: true,
              message: '주의사항을 입력해 주세요',
            },
          ]}
        >
          <TextArea rows={2} name="caution" className="custom-textarea" placeholder="예약시 주의사항을 작성해 주세요" />
        </Form.Item>
        <Form.Item
          label="청소시간"
          name="cleanTime"
          rules={[
            {
              required: true,
              message: '청소 시간을 입력해 주세요',
            },
          ]}
        >
          <Select allowClear>
            <Select.Option value="0">청소시간 없음</Select.Option>
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
          label="기준 인원"
          name="minGuests"
          rules={[
            {
              required: true,
              message: '기준 인원을 입력해 주세요',
            },
          ]}
        >
          <InputNumber placeholder="기준 인원을 선택해 주세요" />
        </Form.Item>
        <Form.Item
          label="최대 추가 인원"
          name="maxGuests"
          rules={[
            {
              required: true,
              message: '최대 추가 인원을 입력해 주세요.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const minGuests = getFieldValue('minGuests');
                if (minGuests === undefined || value >= minGuests) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('최대 추가 인원은 기준 인원보다 크거나 같아야 합니다.'));
              },
            }),
          ]}
        >
          <InputNumber placeholder="최대 추가 인원을 선택해 주세요" />
        </Form.Item>
        <Form.Item
          label="영업 시작 시간"
          name="businessStartTime"
          rules={[{ required: true, message: '영업 시작 시간을 선택해 주세요' }]}
        >
          <Select
            allowClear
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
          rules={[{ required: true, message: '영업 종료 시간을 선택해 주세요' }]}
        >
          <Select
            allowClear
            options={timeOption.filter((opt) => opt.value > (startHour ?? -1))}
            placeholder="종료 시간을 선택하세요"
            disabled={startHour === null} // 시작 시간이 선택되지 않았을 때 비활성화
          />
        </Form.Item>
        <Form.Item
          label="공간 이미지"
          valuePropName="fileList"
          help={fileError} // 오류 메시지 출력
          validateStatus={fileError ? 'error' : undefined} // 검증 상태 설정
        >
          <Upload
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
                <div style={{ marginTop: 8 }}>Image</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="관리자 이름"
          name="spaceAdminName"
          rules={[
            { required: true, message: '관리자 이름을 입력해주세요' },
            {
              pattern: /^[^0-9]*$/, // 숫자가 포함되지 않도록 하는 정규식
              message: '이름에는 숫자가 포함될 수 없습니다.',
            },
          ]}
        >
          <Select
            placeholder="관리자 이름을 입력하세요"
            allowClear
            options={userOption}
            onChange={(value) => handleUser(value)}
          />
        </Form.Item>
        <Form.Item
          label="관리자 전화번호"
          name="spaceAdminPhoneNumber"
          rules={[
            { required: true, message: '전화번호를 입력해주세요' },
            {
              pattern: /^[0-9]{11}$/,
              message: '전화번호는 11자리 숫자여야 합니다.',
            },
          ]}
        >
          <Input placeholder="공간 관리자 연락처를 작성해 주세요" />
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

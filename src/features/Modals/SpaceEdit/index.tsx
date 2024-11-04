import { updateSpace } from '@/pages/api/spaceAPI';
import { postSignup, updateOneUser } from '@/pages/api/userApi';
import { Button, Input, message, Modal, Select } from 'antd';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

interface optionProps {
  setIsModalOpen: any;
  data?: any;
  fetchSpaceData?: any;
  spaceId: number;
}

const SpaceEdit = ({ setIsModalOpen, data, fetchSpaceData, spaceId }: optionProps) => {
  const bankOpt = [
    { value: 'KB', label: '국민은행' },
    { value: 'IBK', label: '기업은행' },
    { value: 'WOORI', label: '우리은행' },
    { value: 'NH', label: '농협은행' },
    { value: 'SHINHAN', label: '신한은행' },
    { value: 'HANA', label: '하나은행' },
    { value: 'CITI', label: '한국씨티은행' },
    { value: 'SC', label: 'SC제일은행' },
    { value: 'DGB', label: '대구은행' },
    { value: 'BNK', label: '부산은행' },
    { value: 'GJB', label: '광주은행' },
    { value: 'JB', label: '전북은행' },
    { value: 'KBN', label: '경남은행' },
    { value: 'Jeju', label: '제주은행' },
  ];

  const spaceInfo = useFormik({
    initialValues: {
      spaceName: data?.spaceName || '',
      spaceAdminName: data?.spaceAdminName || '',
      spaceAdminPhoneNumber: data?.spaceAdminPhoneNumber || '',
      spaceLocation: data?.spaceLocation || '',
      bankAccountName: data?.bankAccountName || '',
      bankAccountOwner: data?.bankAccountOwner || '',
      bankAccountNumber: data?.bankAccountNumber || '',
      spacePrice: data?.spacePrice || '',
      discount: data?.discount || '',
      addPrice: data?.addPrice || '',
      minGuests: data?.minGuests || '',
      maxGuests: data?.maxGuests || '',
      businessStartTime: data?.businessStartTime || '',
      businessEndTime: data?.businessEndTime || '',
      cleanTime: data?.cleanTime || '',
      guidelines: data?.guidelines || '',
      amenities: data?.amenities || '',
      description: data?.description || '',
    },
    onSubmit(values) {
      Modal.confirm({
        title: '수정하시겠습니까?',
        okText: '확인',
        cancelText: '취소',
        onOk: async () => {
          const updatedData = { ...values, spaceId };
          updateSpace(updatedData)
            .then((response) => {
              fetchSpaceData(spaceId);
              message.success('수정 성공');
            })
            .catch((error) => {
              console.error('수정 실패', error);
              message.error('수정 실패');
            });

          setIsModalOpen(false);
        },
      });
    },
  });

  return (
    <>
      <form onSubmit={spaceInfo.handleSubmit}>
        <div className="inputForm">
          <div>공간 명</div>
          <Input
            required
            placeholder="공간 이름을 입력해 주세요."
            name="spaceName"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.spaceName}
          />
        </div>
        <div className="inputForm">
          <div>호스트 명</div>
          <Input
            required
            placeholder="호스트 성함을 입력해 주세요."
            name="spaceAdminName"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.spaceAdminName}
          />
        </div>
        <div className="inputForm">
          <div>전화번호</div>
          <Input
            placeholder="전화번호 입력해 주세요."
            name="spaceAdminPhoneNumber"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.spaceAdminPhoneNumber}
          />
        </div>
        <div className="inputForm">
          <div>주소</div>
          <Input
            required
            placeholder="주소를 입력해 주세요."
            name="spaceLocation"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.spaceLocation}
          />
        </div>
        <div className="selectForm">
          <div>은행명</div>
          <Select
            style={{ width: 100 }}
            options={bankOpt}
            onChange={(value) => spaceInfo.setFieldValue('bankAccountName', value)}
            value={spaceInfo.values.bankAccountName}
          />
        </div>
        <div className="inputForm">
          <div>계좌 소유주</div>
          <Input
            placeholder="계좌 소유주명을 입력해 주세요."
            name="bankAccountOwner"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.bankAccountOwner}
          />
        </div>
        <div className="inputForm">
          <div>계좌 번호</div>
          <Input
            placeholder="계좌 번호를 입력해 주세요."
            name="bankAccountNumber"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.bankAccountNumber}
          />
        </div>
        <div className="inputForm">
          <div>원가</div>
          <Input
            placeholder="원가를 입력해 주세요."
            name="spacePrice"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.spacePrice}
          />
        </div>
        <div className="inputForm">
          <div>할인가</div>
          <Input
            placeholder="할인가를 입력해 주세요."
            name="discount"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.discount}
          />
        </div>
        <div className="inputForm">
          <div>인원 추가 금액</div>
          <Input
            placeholder="인원 추가 금액을 입력해 주세요."
            name="addPrice"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.addPrice}
          />
        </div>
        <div className="inputForm">
          <div>최소 인원</div>
          <Input
            placeholder="최소 인원을 입력해 주세요."
            name="minGuest"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.minGuests}
          />
        </div>
        <div className="inputForm">
          <div>최대 인원</div>
          <Input
            placeholder="최대 인원을 입력해 주세요."
            name="maxGuest"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.maxGuests}
          />
        </div>
        <div className="inputForm">
          <div>영업 시작 시간</div>
          <Input
            placeholder="영업 시작 시간을 입력해 주세요."
            name="businessStartTime"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.businessStartTime}
          />
        </div>
        <div className="inputForm">
          <div>영업 종료 시간</div>
          <Input
            placeholder="영업 종료 시간을 입력해 주세요."
            name="businessEndTime"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.businessEndTime}
          />
        </div>
        <div className="inputForm">
          <div>청소 시간</div>
          <Input
            placeholder="청소 시간을 입력해 주세요."
            name="cleanTime"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.cleanTime}
          />
        </div>
        <div className="inputForm">
          <div>주의 사항</div>
          <Input
            placeholder="주의 사항을 입력해 주세요."
            name="guidelines"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.guidelines}
          />
        </div>
        <div className="inputForm">
          <div>편의 시설</div>
          <Input
            placeholder="편의 시설을 입력해 주세요."
            name="amenities"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.amenities}
          />
        </div>
        <div className="inputForm">
          <div>설명</div>
          <Input
            placeholder="공간 설명을 입력해 주세요."
            name="description"
            onChange={spaceInfo.handleChange}
            value={spaceInfo.values.description}
          />
        </div>

        <div className="btn">
          <Button htmlType="submit">수정</Button>
        </div>
      </form>
    </>
  );
};
export default SpaceEdit;

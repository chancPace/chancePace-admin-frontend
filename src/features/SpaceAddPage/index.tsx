// import React, { useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
// import {
//   Button,
//   Cascader,
//   Checkbox,
//   ColorPicker,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Radio,
//   Rate,
//   Select,
//   Slider,
//   Switch,
//   TreeSelect,
//   Upload,
// } from 'antd';

import { Button, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';

// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

// const SpaceAddPage = () => {
//   const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

//   return (
//     <>
//       <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)}>
//         Form disabled
//       </Checkbox>
//       <Form
//         labelCol={{ span: 4 }}
//         wrapperCol={{ span: 14 }}
//         layout="horizontal"
//         disabled={componentDisabled}
//         style={{ maxWidth: 600 }}
//       >
//         <Form.Item label="공간명">
//           <Input />
//         </Form.Item>
//         <Form.Item label="호스트 이름">
//           <Input />
//         </Form.Item>
//         <Form.Item label="주소">
//           <Select>
//             <Select.Option value="서울">서울</Select.Option>
//             <Select.Option value="경기">경기</Select.Option>
//             <Select.Option value="인천">인천</Select.Option>
//             <Select.Option value="강원도">강원도</Select.Option>
//             <Select.Option value="충청도">충청도</Select.Option>
//             <Select.Option value="전라도">전라도</Select.Option>
//             <Select.Option value="경상도">경상도</Select.Option>
//             <Select.Option value="제주도">제주도</Select.Option>
//           </Select>
//         </Form.Item>
//         <Form.Item label="등록 기간">
//           <RangePicker />
//         </Form.Item>
//         <Form.Item label="최소 인원">
//           <InputNumber />
//         </Form.Item>
//         <Form.Item label="최대 인원">
//           <InputNumber />
//         </Form.Item>
//         <Form.Item label="공간 설명">
//           <TextArea rows={4} />
//         </Form.Item>
//         <Form.Item label="이미지 등록" valuePropName="fileList" getValueFromEvent={normFile}>
//           <Upload action="/upload.do" listType="picture-card">
//             <button style={{ border: 0, background: 'none' }} type="button">
//               <PlusOutlined />
//               <div style={{ marginTop: 8 }}>Upload</div>
//             </button>
//           </Upload>
//         </Form.Item>
//         <Form.Item label="공간 등록">
//           <Button>승인</Button>
//           <Button>취소</Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default SpaceAddPage;

const SpaceAddPage = () => {
  const space = useFormik({
    initialValues: {
      image: '',
      spaceName: '',
      spaceLocation: '',
      description: '',
      spacePrice: '',
      discount: '',
      amenities: '',
      cleanTime: '',
      spaceStatus: '',
      isOpen: false,
      minGuests: '',
      maxGuests: '',
      guidelines: '',
    },
    onSubmit: (values) => {
      // 데이터 변환
      const dataToSend = {
        ...values,
        image: `data:image/jpeg;base64,${values.image}`, // 이미지 데이터를 Base64로 변환
      };

      // API 호출 예시 (axios 사용)
      console.log('Sending data:', dataToSend);
      // axios.post('/api/your-endpoint', dataToSend)
      //   .then(response => {
      //     console.log('Success:', response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
    },
  });

  return (
    <form onSubmit={space.handleSubmit}>
      <div>
        <label>공간 이름</label>
        <Input
          name="spaceName"
          onChange={space.handleChange}
          value={space.values.spaceName}
          placeholder="공간 이름을 입력하세요."
        />
      </div>
      <div>
        <label>공간 위치</label>
        <Input
          name="spaceLocation"
          onChange={space.handleChange}
          value={space.values.spaceLocation}
          placeholder="공간 위치를 입력하세요."
        />
      </div>
      <div>
        <label>설명</label>
        <TextArea
          name="description"
          onChange={space.handleChange}
          value={space.values.description}
          placeholder="공간에 대한 설명을 입력하세요."
        />
      </div>
      <div>
        <label>가격</label>
        <Input
          type="number"
          name="spacePrice"
          onChange={space.handleChange}
          value={space.values.spacePrice}
          placeholder="공간 가격을 입력하세요."
        />
      </div>
      <div>
        <label>할인</label>
        <Input
          type="number"
          name="discount"
          onChange={space.handleChange}
          value={space.values.discount}
          placeholder="할인 금액을 입력하세요."
        />
      </div>
      <div>
        <label>편의시설</label>
        <Input
          name="amenities"
          onChange={space.handleChange}
          value={space.values.amenities}
          placeholder="편의시설을 입력하세요."
        />
      </div>
      <div>
        <label>청소 시간 (분)</label>
        <Input
          type="number"
          name="cleanTime"
          onChange={space.handleChange}
          value={space.values.cleanTime}
          placeholder="청소 시간을 입력하세요."
        />
      </div>
      <div>
        <label>상태</label>
        <Select
          onChange={(value) => space.setFieldValue('spaceStatus', value)}
          value={space.values.spaceStatus}
          placeholder="공간 상태 선택"
        />
      </div>
      <div>
        <label>오픈 여부</label>
        <Select onChange={(value) => space.setFieldValue('isOpen', value)} value={space.values.isOpen} />
      </div>
      <div>
        <label>최소 인원</label>
        <Input
          type="number"
          name="minGuests"
          onChange={space.handleChange}
          value={space.values.minGuests}
          placeholder="최소 인원 수를 입력하세요."
        />
      </div>
      <div>
        <label>최대 인원</label>
        <Input
          type="number"
          name="maxGuests"
          onChange={space.handleChange}
          value={space.values.maxGuests}
          placeholder="최대 인원 수를 입력하세요."
        />
      </div>
      <div>
        <label>가이드라인</label>
        <TextArea
          name="guidelines"
          onChange={space.handleChange}
          value={space.values.guidelines}
          placeholder="가이드라인을 입력하세요."
        />
      </div>
      <div>
        <label>이미지 (Base64)</label>
        <Input
          name="image"
          onChange={space.handleChange}
          value={space.values.image}
          placeholder="Base64로 변환된 이미지 데이터 입력"
        />
      </div>
      <Button type="primary" htmlType="submit">
        제출
      </Button>
    </form>
  );
};

export default SpaceAddPage;

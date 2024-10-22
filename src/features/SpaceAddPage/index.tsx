import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const SpaceAddPage = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  return (
    <>
      <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)}>
        Form disabled
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="공간명">
          <Input />
        </Form.Item>
        <Form.Item label="호스트 이름">
          <Input />
        </Form.Item>
        <Form.Item label="주소">
          <Select>
            <Select.Option value="서울">서울</Select.Option>
            <Select.Option value="경기">경기</Select.Option>
            <Select.Option value="인천">인천</Select.Option>
            <Select.Option value="강원도">강원도</Select.Option>
            <Select.Option value="충청도">충청도</Select.Option>
            <Select.Option value="전라도">전라도</Select.Option>
            <Select.Option value="경상도">경상도</Select.Option>
            <Select.Option value="제주도">제주도</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="등록 기간">
          <RangePicker />
        </Form.Item>
        <Form.Item label="최소 인원">
          <InputNumber />
        </Form.Item>
        <Form.Item label="최대 인원">
          <InputNumber />
        </Form.Item>
        <Form.Item label="공간 설명">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="이미지 등록" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="공간 등록">
          <Button>승인</Button>
          <Button>취소</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SpaceAddPage;

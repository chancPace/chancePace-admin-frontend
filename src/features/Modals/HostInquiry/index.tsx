import { useFormik } from 'formik';
import { Button, Input, Modal, Radio } from 'antd';
import { HostReqModalStyled } from './style';
const RadioGroup = Radio.Group;
const { TextArea } = Input;

interface HostReqProps {
  setIsModalOpen: any;
  data?: any;
}

const HostInquiryModal = ({ setIsModalOpen, data }: HostReqProps) => {
  console.log('🚀 ~ HostInquiryModal ~ data:', data);
  const inquiry = useFormik({
    initialValues: {
      inquiryMemberType: data[0]?.memberType,
      inquiryTitle: data[0]?.inquiryTitle,
      inquiryEmail: data[0]?.inquiryEmail,
      inquiryContents: data[0]?.inquiryContents,
      inquiryStatus: data[0]?.inquiryStatus,
    },

    onSubmit: (values) => {
      Modal.confirm({
        title: ' 답변 완료 상태로 변경하시겠습니까?',
        okText: '확인',
        cancelText: '취소',
        onOk: async () => {},
      });
    },
  });

  return (
    <HostReqModalStyled>
      <form onSubmit={inquiry.handleSubmit} className="form">
        <div>
          <p>회원 상태</p>
          <RadioGroup
            name="inquiryMemberType"
            value={inquiry.values.inquiryMemberType}
            onChange={(e) => inquiry.setFieldValue('inquiryMemberType', e.target.value)}
          >
            <Radio value={'MEMBER'}>회원</Radio>
            <Radio value={'NONMEMBER'}>비회원</Radio>
          </RadioGroup>
        </div>
        <div>
          <p>답변 상태</p>
          <RadioGroup
            name="inquiryStatus"
            value={inquiry.values.inquiryStatus}
            onChange={(e) => inquiry.setFieldValue('inquiryStatus', e.target.value)}
          >
            <Radio value={'COMPLETED'}>답변 완료</Radio>
            <Radio value={'UNCOMPLETED'}>답변 미완료</Radio>
          </RadioGroup>
        </div>
        <div>
          <p>제목</p>
          <Input name="inquiryTitle" value={inquiry.values.inquiryTitle} />
        </div>
        <div>
          <p>이메일</p>
          <Input name="inquiryEmail" value={inquiry.values.inquiryEmail} />
        </div>
        <div>
          <p>문의 내용</p>
          <TextArea className="inquiryContent" name="inquiryContents" value={inquiry.values.inquiryContents} />
        </div>
        <div className="btn">
          <Button htmlType="submit">문의 상태 변경</Button>
        </div>
      </form>
    </HostReqModalStyled>
  );
};
export default HostInquiryModal;

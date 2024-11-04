import { useRouter } from 'next/router';
import { Badge, Button, Descriptions, Modal, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import SpaceDetailStyled from './style';
import { getOneSpace, updateSpace } from '@/pages/api/spaceAPI';
import SpaceEdit from '../Modals/SpaceEdit';
import { Space } from '@/types';

const SpaceDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const spaceId = Number(id);
  const [data, setData] = useState<Space>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSpaceData = async (spaceId: number) => {
    try {
      const response = await getOneSpace(spaceId);
      const result = response.data.data;
      if (result) {
        // lastLogin과 createdAt 변환
        result.lastLogin = result.lastLogin ? result.lastLogin.split('T')[0] : '';
        result.createdAt = result.createdAt ? result.createdAt.split('T')[0] : '';
        setData(result);
      }
    } catch (error) {
      console.log('공간1개', error);
    }
  };

  useEffect(() => {
    if (id) {
      const spaceId = Number(id);
      fetchSpaceData(spaceId);
    }
  }, [id]);

  const items = [
    {
      key: '1',
      label: '공간명',
      children: data?.spaceName,
    },

    {
      key: '2',
      label: '호스트명',
      children: data?.spaceAdminName,
    },
    {
      key: '3',
      label: '전화번호',
      children: data?.spaceAdminPhoneNumber,
    },
    {
      key: '4',
      label: '주소',
      children: data?.spaceLocation,
      span: 2,
    },
    {
      key: '5',
      label: '계좌 정보',
      children: (
        <>
          {/* <span style={{ display: 'inline-block', marginRight: 30 }}>{data?.bankAccountName}</span>
          <span style={{ display: 'inline-block', marginRight: 30 }}> {data?.bankAccountNumber}</span>
          <span style={{ display: 'inline-block' }}>{data?.bankAccountOwner}</span> */}
          추후 등록!!!!
        </>
      ),
      span: 2,
    },
    {
      key: '6',
      label: '등록일',
      children: data?.createdAt,
    },
    {
      key: '7',
      label: '관리자 승인',
      children:
        data?.spaceStatus === 'AVAILABLE' ? (
          <Tag icon={<SyncOutlined spin />} color="processing">
            승인
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            미승인
          </Tag>
        ),
    },
    {
      key: '8',
      label: '운영',
      children:
        data?.isOpen === true ? <Badge status="processing" text="운영중" /> : <Badge status="default" text="미운영" />,
    },

    {
      key: '9',
      label: '원가',
      children: data?.spacePrice,
    },
    {
      key: '10',
      label: '할인가',
      children: data?.discount,
    },
    {
      key: '11',
      label: '인원 추가 금액',
      children: data?.addPrice,
    },

    {
      key: '12',
      label: '이용 가능 인원',
      children: `${data?.minGuests} ~ ${data?.maxGuests}`,
    },

    {
      key: '13',
      label: '영업 시간',
      children: `${data?.businessStartTime} ~ ${data?.businessEndTime}`,
    },
    {
      key: '14',
      label: '청소시간',
      children: data?.cleanTime,
    },
    {
      key: '15',
      label: '평점',
      children: data?.spaceRating,
    },
    {
      key: '16',
      label: '주의사항',
      children: data?.guidelines,
    },
    {
      key: '17',
      label: '편의시설',
      children: data?.amenities,
    },
    {
      key: '18',
      label: '설명',
      children: data?.description,
    },
    // {
    //   key: '10',
    //   label: '멤버쉽 현황',
    //   children: data?.membership ? <Badge status="processing" text="이용" /> : <Badge status="default" text="미사용" />,
    // },
  ];

  return (
    <SpaceDetailStyled>
      <p>공간 정보</p>
      <Button
        htmlType="submit"
        className="edit"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        수정
      </Button>
      <Modal
        width={400}
        title="공간 정보 수정"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        className="modal"
      >
        <SpaceEdit setIsModalOpen={setIsModalOpen} data={data} spaceId={spaceId} fetchSpaceData={fetchSpaceData} />
      </Modal>

      <Button
        className="delete"
        onClick={() => {
          Modal.confirm({
            title: (
              <>
                공간을 삭제하시겠습니까?
                <br />
                삭제해도 데이터는 사라지지 않습니다.
              </>
            ),
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
              const updatedData = { spaceId, isOpen: false };
              updateSpace(updatedData);
              await fetchSpaceData(spaceId);
              router.reload();
            },
          });
        }}
      >
        삭제
      </Button>
      <Button
        className="delete"
        onClick={() => {
          Modal.confirm({
            title: '공간을 승인하겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
              const updatedData = { spaceId, spaceStatus: 'AVAILABLE' };
              updateSpace(updatedData);
              await fetchSpaceData(spaceId);
              router.reload();
            },
          });
        }}
      >
        승인
      </Button>

      <Descriptions bordered items={items} />
    </SpaceDetailStyled>
  );
};

export default SpaceDetailPage;

import SearchComponent from '@/components/searches';

const SpaceListPage = () => {
  const LabelList = ['호스트', '공간 유형', '지역'];

  return (
    <>
      <p>공간 조회</p>
      <SearchComponent labelList={LabelList} />
      {/* 송이님 card 컴포넌트 복붙하기! */}
    </>
  );
};
export default SpaceListPage;

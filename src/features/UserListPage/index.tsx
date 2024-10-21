import Search from '@/components/search';
import Tables from '@/components/tables';

const UserListPage = () => {
  const labelList = ['회원 등급', '성별', '지역'];

  return (
    <>
      <Search labelList={labelList} />
      <Tables />
    </>
  );
};
export default UserListPage;

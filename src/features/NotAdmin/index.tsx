import { useDispatch } from 'react-redux';
import { logout } from '@/utill/redux/slices/userSlice';
import Cookies from 'js-cookie';
import { Button } from 'antd';
import { NotAdminStyled } from './style';
import { useRouter } from 'next/router';

const NotAdmin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
    Cookies.remove('adminToken');
    router.reload();
  };

  return (
    <NotAdminStyled>
      <p>관리자만 사용 가능합니다. 관리자 아이디로 로그인해주세요!!</p>
      <Button onClick={handleClick}>관리자 로그인하러 가기</Button>
    </NotAdminStyled>
  );
};

export default NotAdmin;

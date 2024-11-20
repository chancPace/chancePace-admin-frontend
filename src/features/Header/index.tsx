import { RootState } from '@/utill/redux/store';
import { HeaderStyled } from './style';
import Link from 'next/link';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { logout } from '@/utill/redux/slices/userSlice';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const handleLogout = () => {
    Cookies.remove('adminToken');
    dispatch(logout());
    router.reload();
  };
  return (
    <HeaderStyled>
      <nav>
        {!isLoggedIn ? (
          <>
            <Link href="/login">
              <span className="logo">CHAN'SPACE</span>
              <img src="logo" alt="" />
            </Link>
          </>
        ) : (
          <>
            <Link href="/">
              <span className="logo">CHAN'SPACE</span>
            </Link>
            <div className="useBar">
              <p onClick={handleLogout}>로그아웃</p>
            </div>
          </>
        )}
      </nav>
    </HeaderStyled>
  );
};
export default Header;

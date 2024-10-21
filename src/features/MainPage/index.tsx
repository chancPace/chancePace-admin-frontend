import { MainStyled } from './style';
import Charts from '@/components/charts';
import personIcon from '@/assets/img/personIcon.png';

const MainPage = () => {
  return (
    <MainStyled>
      <div className="wrap top">
        <p>관리</p>
        <hr></hr>
        <div className="content">
          <p>
            공간 승인 요청 <span>2</span>
          </p>
          <p>
            광고 승인 요청 <span>5</span>
          </p>
          <p>
            문의 내역
            <span>6</span>
          </p>
        </div>
      </div>
      <div className="bottom">
        <div className="wrap bottomLeft">
          <p>금일 접속자 수</p>
          <hr></hr>
          <div className="content">
            <img src={personIcon.src} alt="personIcon" />
            <span>10</span>
          </div>
        </div>
        <div className="wrap bottomRight">
          <Charts />
        </div>
      </div>
    </MainStyled>
  );
};
export default MainPage;

import { MainStyled } from './style';
import Charts from '@/components/charts';
import personIcon from '@/assets/img/personIcon.png';

const MainPage = () => {
  return (
    <MainStyled>
      <div>
        <p>관리</p>
        <hr></hr>
        <div>
          공간 승인 요청 <span>2</span>
        </div>
        <div>
          광고 승인 요청 <span>5</span>
        </div>
        <div>
          문의 내역
          <span>6</span>
        </div>
      </div>
      <div>
        <p>금일 접속자 수</p>
        <hr></hr>
        <img src={personIcon.src} alt="personIcon" />
        <div>공간 승인 요청</div>
        <div>10</div>
        <div>문의 내역</div>
      </div>
      <Charts></Charts>
    </MainStyled>
  );
};
export default MainPage;

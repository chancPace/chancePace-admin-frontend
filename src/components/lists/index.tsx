import personIcon from '@/assets/img/personIcon.png';
import ListStyle from './style';

const ListComponent = () => {
  return (
    <ListStyle>
      <img src={personIcon?.src} />
      <div className="text">
        <p>공간 명</p>
        <p>호스트 성함</p>
      </div>
    </ListStyle>
  );
};

export default ListComponent;

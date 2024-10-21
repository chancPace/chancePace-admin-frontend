import styled from 'styled-components';

export const MainStyled = styled.div`
  .wrap {
    padding: 10px 20px;
    background-color: #f5f5f5;
  }
  .content {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .top {
    margin-bottom: 30px;
    .topContent {
      p {
        width: 30%;
      }
    }
  }

  .bottom {
    display: flex;
    width: 100%;
    height: 450px;
    justify-content: space-between;
    .bottomLeft {
      width: 200px;
      height: 120px;

      img {
        width: 50px;
      }
    }
    .bottomRight {
      width: calc(100% - 250px);
    }
  }
`;

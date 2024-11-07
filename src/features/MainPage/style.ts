import styled from 'styled-components';

export const MainStyled = styled.div`
  .content_wrap {
    background-color: #f5f5f5;
    padding: 20px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .content {
      width: 200px;
      .title {
        font-size: ${({ theme }) => theme.fontSizes.md};
        padding-bottom: 10px;
        border-bottom: 1px solid black;
      }
      .bottom {
        padding: 0 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: ${({ theme }) => theme.fontSizes.sm};
        }
        .icon {
          font-size: 30px;
        }
      }
    }

    .title {
      margin-bottom: 10px;
      border-bottom: 1px solid black;
    }
  }
`;

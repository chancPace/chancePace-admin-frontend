import styled from 'styled-components';

const SearchStyle = styled.div`
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background-color: #f5f5f5;

  .wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }

  .left {
    width: 90%;
    margin-right: 30px;
  }

  .left_top {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p {
      font-size: ${({ theme }) => theme.fontSizes.md};
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
  }

  .right {
    width: 10%;
  }
`;

export default SearchStyle;

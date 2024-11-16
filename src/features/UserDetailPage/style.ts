import styled from 'styled-components';

const UserDetailStyled = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    p {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: bold;
    }
  }
  .button_wrap {
    display: flex;
    gap: 10px;
  }
`;

export default UserDetailStyled;

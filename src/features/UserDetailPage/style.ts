import styled from 'styled-components';

const UserDetailStyled = styled.div`
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  }
  .button_wrap {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    display: flex;
    justify-content: right;
    gap: 10px;
  }
`;

export default UserDetailStyled;

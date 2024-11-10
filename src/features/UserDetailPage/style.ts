import styled from 'styled-components';

const UserDetailStyled = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  }
  .button_wrap {
    display: flex;
    justify-content: space-between;

    .edit {
      margin: ${({ theme }) => theme.spacing.md};
      margin-left: 0;
    }
  }
`;

export default UserDetailStyled;

import styled from 'styled-components';

export const HeaderStyled = styled.div`
  width: 100vw;
  height: 50px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  padding: ${({ theme }) => theme.spacing.sm};
  nav {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      padding: 0 10px;
    }
  }
`;

import styled from 'styled-components';

const SpaceDetailStyled = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin: ${({ theme }) => theme.spacing.md};
    font-weight: bold;
  }
  .buttonWrap {
    display: flex;
    justify-content: space-between;
  }
  .edit {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
`;

export default SpaceDetailStyled;

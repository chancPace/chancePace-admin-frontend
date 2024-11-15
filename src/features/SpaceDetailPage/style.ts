import styled from 'styled-components';

const SpaceDetailStyled = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    margin: ${({ theme }) => theme.spacing.md};
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  }
  .buttonWrap {
    display: flex;
    gap: 15px;
  }
`;

export default SpaceDetailStyled;

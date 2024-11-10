import styled from 'styled-components';

const SpaceDetailStyled = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  }
  .buttonWrap {
    display: flex;
    justify-content: space-between;
  }
  .edit {
    margin: ${({ theme }) => theme.spacing.md};
    margin-left: 0;
  }
`;

export default SpaceDetailStyled;

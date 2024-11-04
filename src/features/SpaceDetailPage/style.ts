import styled from 'styled-components';

const SpaceDetailStyled = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  }
  .edit {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
`;

export default SpaceDetailStyled;
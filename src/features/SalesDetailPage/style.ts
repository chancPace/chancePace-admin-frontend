import styled from 'styled-components';

const SpaceDetailStyled = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: bold;
  }
`;

export default SpaceDetailStyled;

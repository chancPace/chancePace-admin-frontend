import styled from 'styled-components';

const ChartStyled = styled.div`
  .top {
    display: flex;
    flex-direction: row;
    justify-content: left;
    gap: 10px;
  }
  .title {
    margin: ${({ theme }) => theme.spacing.md} 0;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

export default ChartStyled;

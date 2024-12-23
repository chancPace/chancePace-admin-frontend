import styled from 'styled-components';

const CouponDetailStyled = styled.div`
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    p {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: bold;
    }
  }
  .button_wrap {
    display: flex;
    gap: 15px;
  }
`;

export default CouponDetailStyled;

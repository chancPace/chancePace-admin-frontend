import styled from 'styled-components';

const ReviewDetailStyle = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    p {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      margin-bottom: ${({ theme }) => theme.spacing.md};
      font-weight: bold;
    }
  }
`;

export default ReviewDetailStyle;

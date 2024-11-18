import styled from 'styled-components';

const BookingDetailStyled = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    p {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: bold;
    }
  }
`;

export default BookingDetailStyled;

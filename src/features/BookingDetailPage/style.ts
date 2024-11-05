import styled from 'styled-components';

const BookingDetailStyled = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  }
  .edit {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
`;

export default BookingDetailStyled;

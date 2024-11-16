import styled from 'styled-components';

const BookingDetailStyled = styled.div`
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  }
`;

export default BookingDetailStyled;

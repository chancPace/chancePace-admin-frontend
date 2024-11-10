import styled from 'styled-components';

const BookingDetailStyled = styled.div`
  p {
    margin: ${({ theme }) => theme.spacing.md};
    margin-left: 0;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  }
`;

export default BookingDetailStyled;

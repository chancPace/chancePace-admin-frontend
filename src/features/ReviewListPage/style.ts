import styled from 'styled-components';

const ReviewListStyle = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: bold;
  }
`;

export default ReviewListStyle;

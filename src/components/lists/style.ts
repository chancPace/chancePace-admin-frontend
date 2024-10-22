import styled from 'styled-components';

const ListStyle = styled.div`
  width: 90%;
  background-color: #f5f5f5;
  display: flex;

  img {
    width: 100px;
    height: 100px;
  }
  .text {
    padding: ${({ theme }) => theme.spacing.md};
    p:first-of-type {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }
`;

export default ListStyle;

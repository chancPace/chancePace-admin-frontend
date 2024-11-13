import styled from 'styled-components';

export const HostReqModalStyled = styled.div`
  .form {
    .radio {
      display: flex;
      justify-content: space-between;
    }
    div {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      .inquiryContent {
        resize: none;
        height: 150px;
      }
    }
    p {
      font-size: ${({ theme }) => theme.fontSizes.md};
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
    .btn {
      display: flex;
      justify-content: right;
    }
  }
`;

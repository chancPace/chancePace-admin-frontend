import styled from 'styled-components';

const BookingListStyled = styled.div`
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  }
  .register {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  .form_wrap {
    display: flex;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.1);

    .ant-input {
      width: 400px;
      margin-right: 5px;
    }
  }

  .form {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .label {
      margin-bottom: 10px;
    }
  }

  .modal {
    .selectForm {
      display: flex;
      justify-content: space-between;
    }
    .genderLabel,
    .authLabel {
      width: 100px;
      color: red;
    }
    .selected {
    }
  }
`;

export default BookingListStyled;

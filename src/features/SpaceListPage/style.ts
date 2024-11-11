import styled from 'styled-components';

const SpaceListStyled = styled.div`
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

export default SpaceListStyled;

import styled from 'styled-components';

export const LoginStyled = styled.div`
  margin: 0px auto;
  height: 100vh;
  display: flex;
  align-items: center;
  .form {
    background-color: rgba(255, 255, 255, 0.8);
    width: 450px;
    margin: auto;
    padding: 50px;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px solid lightgray;
    .span1 {
      display: block;
      margin-top: 10px;
    }
    z-index: 10;
  }

.formLogo{
  text-align: center;
  width: 100%;
  .logo{
    font-size: 20px;
    font-weight: bolder;
    margin-bottom: 10px;
  }
  .title{
    margin-bottom: 20px;
  }
}
`;

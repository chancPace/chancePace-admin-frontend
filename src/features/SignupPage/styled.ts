import styled from 'styled-components';

export const SignupFormStyled = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    .form {
        border-radius: ${({ theme }) => theme.borderRadius};
        width: 450px;
        margin: auto;
        padding: 50px;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 100;
        border: 1px solid lightgray;
        .error {
            color: ${({ theme }) => theme.color.warning};
        }
    }
    .formLogo {
        position: absolute;
        left: 50%;
        top: 90%;
        transform: translate(-50%, -90%);
        font-size: ${({ theme }) => theme.fontSizes.big};
    }
`;

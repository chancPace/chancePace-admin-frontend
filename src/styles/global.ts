import { createGlobalStyle } from 'styled-components';

export const GlobalStyled = createGlobalStyle`

 @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none; 
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: 'GmarketSansMedium';
}

a{
  color: black;
  text-decoration: none;
}




@media (max-width: 1500px) {
  html,body {
    font-size: 14px;
  }
}

@media (max-width: 720px) {
  html,
  body {
    font-size: 3.5vw;
  }
}

`;

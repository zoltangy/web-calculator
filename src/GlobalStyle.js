import { createGlobalStyle, css } from "styled-components";
import myFont from "./fonts/Display.ttf";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}
    
  @font-face {
    font-family: 'Display';
    src: url(${myFont}) format('truetype');
    font-weight: normal;
  }

  html {
    box-sizing: border-box;
    ${props =>
      props.transitionEnabled &&
      css`
        transition: all 0.2s linear;
      `};
  }

  *, *:before, *:after {
    box-sizing: inherit;
    ${props =>
      props.transitionEnabled &&
      css`
        transition: inherit;
      `};
  }

  body {
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.bg};
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";
import myFont from "./fonts/Display.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Display';
    src: url(${myFont}) format('truetype');
    font-weight: normal;
  }

  html {
  box-sizing: border-box;
  }

  *, *:before, *:after {
  box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    background-color: #d9d9d9;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }



`;

export default GlobalStyle;

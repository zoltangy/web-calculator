import React from "react";
import styled from "styled-components";

const StyledResultDisplay = styled.p`
  width: 100%;
  height: calc(100% / 2);
  margin: 0 0 7px 0;
  padding: 0 5px 0 5px;
  font-family: "Display", sans-serif;
  font-weight: normal;
  font-size: 24px;
  color: #cddeaa;
  background-color: #44656b;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ResultDisplay = props => {
  return (
    <StyledResultDisplay id="display">{props.display}</StyledResultDisplay>
  );
};

export default ResultDisplay;

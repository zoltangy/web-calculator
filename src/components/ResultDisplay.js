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
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.display};
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default function ResultDisplay(props) {
  return (
    <StyledResultDisplay id="display">{props.display}</StyledResultDisplay>
  );
}

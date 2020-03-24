import React from "react";
import styled from "styled-components";

const StyledModeDisplay = styled.p`
  width: 100%;
  height: calc((100% / 4));
  margin: 0px;
  padding: 5px;
  font-family: monospace;
  font-weight: normal;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.display};
`;

export default function ModeDisplay(props) {
  let text = props.formulaLogic
    ? "Mode: Formula logic"
    : "Mode: Immediate execution logic";
  return <StyledModeDisplay id="modeDisplay">{text}</StyledModeDisplay>;
}

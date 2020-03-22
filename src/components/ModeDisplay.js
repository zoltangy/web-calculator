import React from "react";
import styled from "styled-components";

const StyledModeDisplay = styled.p`
  margin: 0px;
  width: 100%;
  height: calc((100% / (7 * 2)));
  font-family: "Display", sans-serif;
  font-weight: normal;
  color: red;
  background-color: #132133;
`;

const ModeDisplay = props => {
  let text = props.formulaLogic
    ? "Mode: Formula logic"
    : "Mode: Immediate execution logic";
  return <StyledModeDisplay id="modeDisplay">{text}</StyledModeDisplay>;
};

export default ModeDisplay;

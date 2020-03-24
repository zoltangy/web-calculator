import React from "react";
import styled from "styled-components";
import ModeDisplay from "./ModeDisplay";
import AggregateDisplay from "./AggregateDisplay";
import ResultDisplay from "./ResultDisplay";

const StyledDisplay = styled.div`
  height: calc((100% / 7) * 2);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Display(props) {
  return (
    <StyledDisplay>
      <ModeDisplay formulaLogic={props.formulaLogic} />
      <AggregateDisplay aggregate={props.aggregate} />
      <ResultDisplay display={props.display} />
    </StyledDisplay>
  );
}

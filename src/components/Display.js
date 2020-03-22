import React from "react";
import styled from "styled-components";

const StyledDisplay = styled.p`
  margin: 0px;
  width: 100%;
  height: calc(((100% / 7) * 1.5) / 3 * 2);
  font-family: "Display", sans-serif;
  font-weight: normal;
  color: red;
  text-align: right;

  background-color: #132133;
`;

const StyledAggregateDisplay = styled.p`
  margin: 0px;
  width: 100%;
  height: calc(((100% / 7) * 1.5) / 3);
  font-family: "Display", sans-serif;
  font-weight: normal;
  font-style: italic;
  color: red;
  text-align: right;
  background-color: #132133;
`;

const Display = props => {
  return (
    <>
      <StyledAggregateDisplay id="aggregateDisplay">
        {props.aggregate}
      </StyledAggregateDisplay>
      <StyledDisplay id="display">{props.display}</StyledDisplay>
    </>
  );
};

export default Display;

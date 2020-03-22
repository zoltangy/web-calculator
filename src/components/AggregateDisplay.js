import React from "react";
import styled from "styled-components";

const StyledAggregateDisplay = styled.p`
  width: 100%;
  height: calc(100% / 4);
  margin: 0px;
  padding: 0 5px 0 5px;
  font-family: "Display", sans-serif;
  font-weight: normal;
  font-style: italic;
  color: #cddeaa;
  background-color: #44656b;
  text-align: right;
`;

const AggregateDisplay = props => {
  return (
    <StyledAggregateDisplay id="aggregateDisplay">
      {props.aggregate}
    </StyledAggregateDisplay>
  );
};

export default AggregateDisplay;

import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  width: calc(100% / 4);
  ${props =>
    props.doubleX &&
    css`
      width: calc(100% / 2);
    `};

  height: calc(100% / 7);
  background-color: #1a455c;
  color: #dce3ca;
`;

const Button = props => {
  return (
    <StyledButton
      id={props.id}
      doubleX={!!props.doubleX}
      onClick={e => {
        props.handleClick({ type: e.target.innerHTML });
      }}
    >
      {props.text}
    </StyledButton>
  );
};

export default Button;

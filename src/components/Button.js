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
  box-shadow: inset 0px 1px 3px 0px #91b8b3;
  background: linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
  background-color: #768d87;
  border-radius: 5px;
  border: 1px solid #566963;
  display: inline-block;
  color: #dce3ca;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 11px 23px;
  text-decoration: none;
  text-shadow: 0px -1px 0px #2b665e;
  &:hover {
    background: linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
    background-color: #6c7c7c;
  }
  &:active {
    position: relative;
    top: 1px;
  }
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

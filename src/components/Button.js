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
  box-shadow: inset 0px 1px 3px 0px ${props => props.theme.buttonShadow};
  background: linear-gradient(
    to bottom,
    ${props => props.theme.buttonBg1} 5%,
    ${props => props.theme.buttonBg2} 100%
  );
  background-color: ${props => props.theme.buttonBg1};
  border-radius: 5px;
  border: 1px solid ${props => props.theme.buttonBorder};
  display: inline-block;
  color: ${props => props.theme.buttonText};
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  text-shadow: 0px -1px 0px ${props => props.theme.buttonTextShadow};
  &:hover {
    background: linear-gradient(
      to bottom,
      ${props => props.theme.buttonBg2} 5%,
      ${props => props.theme.buttonBg1} 100%
    );
    background-color: ${props => props.theme.buttonBg2};
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

export default function Button(props) {
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
}

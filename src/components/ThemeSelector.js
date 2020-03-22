import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 1.5rem;
  padding: 7px 7px 0 0;
  width: 320px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${props => props.theme.border};
`;

const StyledCheckBox = styled.input.attrs({ type: "checkbox" })`
  position: relative;
  appearance: none;
  width: 2rem;
  height: calc(2rem / 2);
  background-color: ${props => props.theme.bg};
  border-radius: calc(2rem / 2);
  border-color: ${props => props.theme.border};
  outline: none;
  transition: background 450ms ease;

  &:before,
  &:after {
    position: absolute;
    display: block;
    content: "";
    border-radius: 100%;
    transition: background 450ms ease, transform 450ms ease;
  }

  &:before {
    width: calc(2rem / 2);
    height: calc(2rem / 2);
    background-color: ${props => props.theme.buttonBg1};
  }
  &:checked:before {
    background-color: ${props => props.theme.buttonBg1};
    transform: translateX(100%);
  }
`;

const ThemeSelector = props => {
  return (
    <Wrapper>
      <StyledCheckBox
        onChange={() => {
          props.handleToggle();
        }}
        checked={props.checked}
      />
    </Wrapper>
  );
};

export default ThemeSelector;

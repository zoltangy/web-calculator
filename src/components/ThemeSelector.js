import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 24px;
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
  width: 32px;
  height: 16px;
  background-color: ${props => props.theme.bg};
  border-radius: 16px;
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
    width: 16px;
    height: 16px;
    background-color: ${props => props.theme.buttonBg1};
  }
  &:checked:before {
    background-color: ${props => props.theme.buttonBg1};
    transform: translateX(100%);
  }
`;

const HiddenLabel = styled.label`
  position: absolute;
  left: -1000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export default function ThemeSelector(props) {
  return (
    <Wrapper>
      <StyledCheckBox
        onChange={() => {
          props.handleToggle();
        }}
        checked={props.checked}
        id="themeToggle"
      />
      <HiddenLabel htmlFor="themeToggle">Toggle Theme</HiddenLabel>
    </Wrapper>
  );
}

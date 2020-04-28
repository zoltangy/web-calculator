import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 24px;
  padding: 7px 7px 0 0;
  width: 320px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${(props) => props.theme.border};
`;

const StyledCheckBox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
`;

const ToggleSpan = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.bg};
  border-radius: 16px;
  transition: background 450ms ease;

  &:before {
    position: absolute;
    display: block;
    left: 2px;
    top: 2px;
    width: 16px;
    height: 16px;
    content: "";
    border-radius: 100%;
    border-color: ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.buttonBg1};
    transition: background 450ms ease, transform 450ms ease;
  }
  input[type="checkbox"]:checked + &:before {
    background-color: ${(props) => props.theme.buttonBg1};
    transform: translateX(16px);
  }
`;

export default function ThemeSelector(props) {
  return (
    <Wrapper>
      <ToggleLabel>
        <StyledCheckBox
          onChange={() => {
            props.handleToggle();
          }}
          checked={props.checked}
          id="themeToggle"
          aria-label="Toggle theme"
        />
        <ToggleSpan></ToggleSpan>
      </ToggleLabel>
    </Wrapper>
  );
}

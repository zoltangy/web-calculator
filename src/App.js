import React, { useReducer, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { darkTheme, lightTheme } from "./Themes";
import GlobalStyle from "./GlobalStyle";

import ThemeSelector from "./components/ThemeSelector.js";
import Display from "./components/Display";
import Button from "./components/Button";
import math from "mathjs-expression-parser";

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Calculator = styled.div`
  border: 7px solid ${props => props.theme.border};
  background-color: ${props => props.theme.border};
  width: 320px;
  height: 455px;
  display: flex;
  flex-wrap: wrap;
`;

function App() {
  const [state, dispatch] = useReducer(reducer, init());
  const [themeToggle, setTheme] = useState(true);

  return (
    <StyledApp>
      <ThemeProvider theme={themeToggle ? lightTheme : darkTheme}>
        <ThemeSelector
          checked={themeToggle}
          handleToggle={() => setTheme(!themeToggle)}
        />
        <Calculator>
          <Normalize />
          <GlobalStyle />
          <Display
            display={state.display}
            aggregate={state.aggregate + state.tempValue}
            formulaLogic={state.formulaLogic}
          />
          <Button id="clear" text="AC" handleClick={dispatch} doubleX />
          <Button id="mode" text="Mode" handleClick={dispatch} />
          <Button id="divide" text="/" handleClick={dispatch} />

          <Button id="seven" text="7" handleClick={dispatch} />
          <Button id="eight" text="8" handleClick={dispatch} />
          <Button id="nine" text="9" handleClick={dispatch} />
          <Button id="multiply" text="X" handleClick={dispatch} />

          <Button id="four" text="4" handleClick={dispatch} />
          <Button id="five" text="5" handleClick={dispatch} />
          <Button id="six" text="6" handleClick={dispatch} />
          <Button id="subtract" text="-" handleClick={dispatch} />

          <Button id="one" text="1" handleClick={dispatch} />
          <Button id="two" text="2" handleClick={dispatch} />
          <Button id="three" text="3" handleClick={dispatch} />
          <Button id="add" text="+" handleClick={dispatch} />

          <Button id="zero" text="0" handleClick={dispatch} doubleX />
          <Button id="decimal" text="." handleClick={dispatch} />
          <Button id="equals" text="=" handleClick={dispatch} />
        </Calculator>
      </ThemeProvider>
    </StyledApp>
  );
}

function init(formulaLogic = true) {
  return {
    aggregate: "",
    display: "0",
    formulaLogic: formulaLogic,
    tempResult: "",
    tempValue: ""
  };
}

function reducer(state, action) {
  var display = state.display;
  var aggregate = state.aggregate;
  var tempResult = state.tempResult;
  var tempValue = state.tempValue;

  // new calc or result carry over
  if (tempValue.slice(-1) === "=" && action.type !== "=") {
    let reg = /(\+|-|X|\/)/;
    if (reg.test(action.type)) {
      // previous result should carry over for new calculation
      aggregate = display;
      tempResult = display;
    } else {
      // start new calculation
      aggregate = "";
      display = "0";
      tempResult = "";
    }
    tempValue = "";
  }

  switch (action.type) {
    case "AC":
      return init(state.formulaLogic);

    case "Mode":
      return init(!state.formulaLogic);

    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      tempValue =
        tempValue
          .replace(/([-+*/]+)0$/, (match, p1) => {
            return p1;
          })
          .replace(/^0(?!\.)/, "") + action.type;
      break;

    case "+":
    case "/":
    case "X":
      let operand = action.type === "X" ? "*" : action.type;
      if (aggregate === "" && tempValue === "") aggregate = "0";
      // Overwrite operand when pressing one after another
      if (isNaN(Number(tempValue.slice(-1)))) {
        tempValue = tempValue.replace(/[+\-*/.]+$/, "");
      } else {
        tempResult = display === "" ? tempValue : display;
        aggregate += tempValue;
        tempValue = "";
      }
      tempValue += operand;
      break;

    case "-":
      // pushing multiple '-' should be ignored
      if (tempValue.slice(-1) !== "-") {
        if (!isNaN(Number(tempValue.slice(-1)))) {
          tempResult = display === "" ? tempValue : display;
          aggregate += tempValue;
          tempValue = "";
        }
        tempValue += action.type;
      }
      break;

    case ".":
      // ensure only one decimal per number
      if (!tempValue.includes(".")) {
        // add implicit zero when decimal pushed after operand or after init
        if (isNaN(Number(tempValue.slice(-1))) || tempValue === "") {
          tempValue += "0";
        }
        tempValue += action.type;
      }
      break;

    case "=":
      // pushing '=' more than once or at init should be ignored
      if (tempValue.slice(-1) !== "=" && aggregate !== "") {
        // remove unfinished operand
        if (isNaN(Number(tempValue.slice(-1)))) {
          tempValue = tempValue.slice(0, -1);
        }
        tempResult = display === "" ? tempValue : display;
        aggregate += tempValue;
        tempValue = action.type;
      }
      break;

    default:
      throw new Error();
  }

  // handle display based on logic
  if (state.formulaLogic) {
    if (aggregate !== "" && action.type === "=")
      display = math.eval(aggregate).toString();
    else if (tempValue === "") display = "0";
    else display = tempValue.replace(/^[+\-*/.=]+/, "");
  } else {
    if (tempValue === "" && aggregate === "") display = "0";
    else if (tempValue === "") display = "";
    else
      display = math
        .eval(tempResult + tempValue.replace(/[+\-*/.=]+$/, ""))
        .toString();
  }

  return {
    ...state,
    display: display,
    aggregate: aggregate,
    tempResult: tempResult,
    tempValue: tempValue
  };
}

export default App;

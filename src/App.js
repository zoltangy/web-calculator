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
  if (action.type === "Mode") {
    return init(!state.formulaLogic);
  }

  if (action.type === "AC") {
    return init(state.formulaLogic);
  }

  if (state.formulaLogic) {
    return formulaLogic(state, action);
  } else {
    return immediateLogic(state, action);
  }
}

function formulaLogic(state, action) {
  var display = state.display;
  var aggregate = state.aggregate;

  // new calc or result carry over
  if (aggregate.slice(-1) === "=" && action.type !== "=") {
    let reg = /(\+|-|X|\/)/;
    if (reg.test(action.type)) {
      // previous result should carry over for new calculation
      aggregate = display;
    } else {
      // start new calculation
      aggregate = "";
    }
    display = "0";
  }

  // handling numbers
  if (!isNaN(Number(action.type))) {
    display = display.replace(/^[+-/*]+/, "").replace(/^0$/, "") + action.type;
    aggregate =
      aggregate
        .replace(/([-+*/]+)0$/, (match, p1) => {
          return p1;
        })
        .replace(/^0(?![.*-/+])/, "") + action.type;
  } else {
    // handling operands, '.', '='
    switch (action.type) {
      case "+":
      case "/":
      case "X":
        let operand = action.type === "X" ? "*" : action.type;
        if (aggregate === "") aggregate = "0";
        // Overwrite operand when pressing one after another
        aggregate = aggregate.replace(/[+\-*/.]+$/, "") + operand;
        display = operand;
        break;

      case "-":
        // pushing multiple '-' should be ignored
        if (aggregate.slice(-1) !== "-") {
          aggregate += action.type;
          display = action.type;
        }
        break;

      case ".":
        // ensure only one decimal per number
        if (!display.includes(".")) {
          // add implicit zero when decimal pushed after operand or after init
          if (isNaN(Number(aggregate.slice(-1))) || aggregate === "") {
            aggregate += "0" + action.type;
            display = "0" + action.type;
          } else {
            // normal case, just add decimal
            aggregate += action.type;
            display += action.type;
          }
        }
        break;

      case "=":
        // pushing '=' more than once or at init should be ignored
        if (aggregate.slice(-1) !== "=" && aggregate !== "") {
          // remove unfinished operand
          aggregate = aggregate.replace(/[+\-*/.]+$/, "");
          display = math.eval(aggregate).toString();
          aggregate += action.type;
        }
        break;

      default:
        throw new Error();
    }
  }
  return {
    ...state,
    display: display,
    aggregate: aggregate
  };
}

function immediateLogic(state, action) {
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

  // handling numbers
  if (!isNaN(Number(action.type))) {
    tempValue =
      tempValue
        .replace(/([-+*/]+)0$/, (match, p1) => {
          return p1;
        })
        .replace(/^0(?!\.)/, "") + action.type;
    display =
      tempResult === "" ? "" : math.eval(tempResult + tempValue).toString();
  } else {
    // handling operands, '.', '='
    switch (action.type) {
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
        display = tempResult;
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
          display = tempResult;
        }
        break;

      case ".":
        // ensure only one decimal per number
        if (!tempValue.includes(".")) {
          // add implicit zero when decimal pushed after operand or after init
          if (isNaN(Number(tempValue.slice(-1))) || tempValue === "") {
            tempValue += "0" + action.type;
          } else {
            tempValue += action.type;
          }
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
          display = tempResult;
        }
        break;

      default:
        throw new Error();
    }
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

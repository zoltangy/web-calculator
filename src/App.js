import React, { useReducer, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Themes";
import math from "mathjs-expression-parser";

import GlobalStyle from "./GlobalStyle";
import ThemeSelector from "./components/ThemeSelector";
import Display from "./components/Display";
import Button from "./components/Button";

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
        <GlobalStyle />
        <ThemeSelector
          checked={themeToggle}
          handleToggle={() => setTheme(!themeToggle)}
        />
        <Calculator>
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

  var newChar = action.type === "X" ? "*" : action.type;

  function isLastCharOperand() {
    return isNaN(Number(tempValue.slice(-1)));
  }

  function removeTrailingDecimal(str) {
    return str.replace(/[.]$/, "");
  }

  function removeTrailingMinus(str) {
    return str.replace(/-+$/, "");
  }

  function removeTrailingOperand(str) {
    return str.replace(/[-+*/=.]+$/, "");
  }

  function removeLeadingZerosInNumbers(str) {
    return str.replace(/^([-+*/]*)0$/, (match, p1) => {
      return p1;
    });
  }

  function lastCharEquals(str) {
    return tempValue.slice(-1) === str;
  }

  function evaluateMathFormula(str) {
    return math.format(math.eval(str), 7);
  }

  // new calc or result carry over
  if (lastCharEquals("=") && newChar !== "=") {
    let reg = /(\+|-|\*|\/)/;
    if (reg.test(newChar)) {
      // previous result should carry over for new calculation
      aggregate = display;
      tempResult = display;
    } else {
      // start new calculation
      aggregate = "";
      tempResult = "";
    }
    tempValue = "";
  }

  switch (newChar) {
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
      if (tempValue.length >= 17 || (aggregate + tempValue).length > 24) {
        return state;
      }
      tempValue = removeLeadingZerosInNumbers(tempValue);
      tempValue += newChar;
      break;

    case "+":
    case "-":
    case "/":
    case "*":
    case "=":
      // initial equal ignored
      if (aggregate === "" && tempValue === "" && newChar === "=") break;
      if (aggregate === "" && tempValue === "") {
        tempValue = display;
      }
      tempValue = removeTrailingDecimal(tempValue);
      if (isLastCharOperand()) {
        if (newChar !== "-") {
          tempValue = removeTrailingOperand(tempValue);
        } else {
          tempValue = removeTrailingMinus(tempValue);
        }
      } else {
        tempResult = display === "" ? tempValue : display;
        aggregate += tempValue;
        tempValue = "";
      }
      tempValue += newChar;
      break;

    case ".":
      // ensure only one decimal per number
      if (!tempValue.includes(".")) {
        // add implicit zero when decimal pushed after operand or after init
        if (isLastCharOperand() || tempValue === "") {
          tempValue += "0";
        }
        tempValue += newChar;
      }
      break;

    default:
      throw new Error();
  }

  // handle display based on mode selected
  if (state.formulaLogic) {
    if (aggregate !== "" && newChar === "=")
      display = evaluateMathFormula(aggregate);
    else if (tempValue === "") display = "0";
    else display = tempValue.replace(/^[-+*/.=]+/, "");
  } else {
    if (tempValue === "" && aggregate === "") display = "0";
    else if (tempValue === "") display = "";
    else
      display = evaluateMathFormula(
        tempResult + tempValue.replace(/[-+*/.=]+$/, "")
      );
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

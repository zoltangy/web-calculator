import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

describe("basic tests", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  test("correct initial state", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("p#display").text()).toBe("0");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("");
    expect(wrapper.find("p#modeDisplay").text()).toMatch(/Formula/);
  });
});

describe("formula logic tests", () => {
  let wrapper;
  let one;
  let two;
  let three;
  let four;
  let five;
  let six;
  let seven;
  let eight;
  let nine;
  let zero;
  let decimal;
  let add;
  let subtract;
  let multiply;
  let divide;
  let clear;
  let mode;
  let equals;
  let modeDisplay;
  let display;
  let aggregateDisplay;

  beforeEach(() => {
    wrapper = mount(<App />);
    one = wrapper.find("button#one");
    two = wrapper.find("button#two");
    three = wrapper.find("button#three");
    four = wrapper.find("button#four");
    five = wrapper.find("button#five");
    six = wrapper.find("button#six");
    seven = wrapper.find("button#seven");
    eight = wrapper.find("button#eight");
    nine = wrapper.find("button#nine");
    zero = wrapper.find("button#zero");
    decimal = wrapper.find("button#decimal");
    add = wrapper.find("button#add");
    subtract = wrapper.find("button#subtract");
    multiply = wrapper.find("button#multiply");
    divide = wrapper.find("button#divide");
    clear = wrapper.find("button#clear");
    mode = wrapper.find("button#mode");
    equals = wrapper.find("button#equals");
    modeDisplay = wrapper.find("p#modeDisplay");
    display = wrapper.find("p#display");
    aggregateDisplay = wrapper.find("p#aggregateDisplay");
  });

  test("1+3=4", () => {
    mode.simulate("click");
    mode.simulate("click");
    expect(modeDisplay.text()).toMatch(/Formula/);
    one.simulate("click");
    expect(display.text()).toBe("1");
    expect(aggregateDisplay.text()).toBe("1");
    add.simulate("click");
    three.simulate("click");
    expect(display.text()).toBe("3");
    expect(aggregateDisplay.text()).toBe("1+3");
    equals.simulate("click");
    expect(display.text()).toBe("4");
    expect(aggregateDisplay.text()).toBe("1+3=");
  });

  test("AC button", () => {
    clear.simulate("click");
    expect(display.text()).toBe("0");
    expect(aggregateDisplay.text()).toBe("");
    one.simulate("click");
    add.simulate("click");
    four.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("5");
    expect(aggregateDisplay.text()).toBe("1+4=");
    clear.simulate("click");
    expect(display.text()).toBe("0");
    expect(aggregateDisplay.text()).toBe("");
  });

  test("several zeros", () => {
    zero.simulate("click");
    zero.simulate("click");
    zero.simulate("click");
    expect(display.text()).toBe("0");
    expect(aggregateDisplay.text()).toBe("0");
  });

  test("removal of leading zeros", () => {
    zero.simulate("click");
    zero.simulate("click");
    six.simulate("click");
    zero.simulate("click");
    add.simulate("click");
    zero.simulate("click");
    seven.simulate("click");
    expect(display.text()).toBe("7");
    expect(aggregateDisplay.text()).toBe("60+7");
  });

  test("operand overwrite", () => {
    eight.simulate("click");
    add.simulate("click");
    multiply.simulate("click");
    add.simulate("click");
    subtract.simulate("click");
    two.simulate("click");
    divide.simulate("click");
    multiply.simulate("click");
    one.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("6");
    expect(aggregateDisplay.text()).toBe("8+-2*1=");
  });

  test("special handling of the minus/subtract operand", () => {
    nine.simulate("click");
    subtract.simulate("click");
    subtract.simulate("click"); //ignored
    subtract.simulate("click"); //ignored
    two.simulate("click");
    subtract.simulate("click");
    add.simulate("click"); //overwrites prev
    two.simulate("click");
    multiply.simulate("click");
    subtract.simulate("click");
    subtract.simulate("click"); // ignored
    add.simulate("click"); //overwrites prev2
    one.simulate("click");
    multiply.simulate("click");
    subtract.simulate("click"); // kept and handled
    one.simulate("click");
    expect(display.text()).toBe("1");
    expect(aggregateDisplay.text()).toBe("9-2+2+1*-1");
  });

  test("only one decimal per number allowed ", () => {
    five.simulate("click");
    decimal.simulate("click");
    decimal.simulate("click");
    five.simulate("click");
    decimal.simulate("click");
    subtract.simulate("click");
    two.simulate("click");
    decimal.simulate("click");
    two.simulate("click");
    decimal.simulate("click");
    expect(display.text()).toBe("2.2");
    expect(aggregateDisplay.text()).toBe("5.5-2.2");
  });

  test("zero added correctly before decimal", () => {
    decimal.simulate("click");
    five.simulate("click");
    decimal.simulate("click");
    subtract.simulate("click");
    decimal.simulate("click");
    two.simulate("click");
    expect(display.text()).toBe("0.2");
    expect(aggregateDisplay.text()).toBe("0.5-0.2");
    add.simulate("click");
    two.simulate("click");
    decimal.simulate("click");
    zero.simulate("click");
    expect(display.text()).toBe("2.0");
    expect(aggregateDisplay.text()).toBe("0.5-0.2+2.0");
  });

  test("decimal removed if not followed by a number", () => {
    decimal.simulate("click");
    five.simulate("click");
    add.simulate("click");
    two.simulate("click");
    decimal.simulate("click");
    add.simulate("click");
    two.simulate("click");
    expect(display.text()).toBe("2");
    expect(aggregateDisplay.text()).toBe("0.5+2+2");
    decimal.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("4.5");
    expect(aggregateDisplay.text()).toBe("0.5+2+2=");
  });

  test("equal button", () => {
    equals.simulate("click"); // initial press should do nothing
    expect(display.text()).toBe("0");
    expect(aggregateDisplay.text()).toBe("");
    two.simulate("click");
    add.simulate("click");
    two.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("4");
    expect(aggregateDisplay.text()).toBe("2+2=");
    multiply.simulate("click"); // result should carry forward
    wrapper.find("button#four").simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("16");
    expect(aggregateDisplay.text()).toBe("4*4=");
    two.simulate("click"); // new calculation should start
    add.simulate("click");
    two.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("4");
    expect(aggregateDisplay.text()).toBe("2+2=");
  });

  test("removal of unfinished operand", () => {
    two.simulate("click");
    add.simulate("click");
    one.simulate("click");
    subtract.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("3");
    expect(aggregateDisplay.text()).toBe("2+1=");
  });

  test("zero added if operand is pressed at init", () => {
    add.simulate("click");
    one.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("1");
    expect(aggregateDisplay.text()).toBe("0+1=");
  });

  test("length restriction on display", () => {
    for (let i = 0; i < 25; i++) {
      five.simulate("click");
    }
    expect(display.text().length).toBe(17);
    expect(aggregateDisplay.text().length).toBe(17);
  });

  test("length restriction on aggregate display", () => {
    for (let i = 0; i < 10; i++) {
      five.simulate("click");
    }
    multiply.simulate("click");
    for (let i = 0; i < 20; i++) {
      five.simulate("click");
    }
    expect(display.text().length).toBe(14);
    expect(aggregateDisplay.text().length).toBe(25);
  });
}); // end of formula logic tests

describe("immediate execution logic tests", () => {
  let wrapper;
  let one;
  let two;
  let three;
  let four;
  let five;
  let six;
  let seven;
  let eight;
  let nine;
  let zero;
  let decimal;
  let add;
  let subtract;
  let multiply;
  let divide;
  let clear;
  let mode;
  let equals;
  let modeDisplay;
  let display;
  let aggregateDisplay;

  beforeEach(() => {
    wrapper = mount(<App />);
    one = wrapper.find("button#one");
    two = wrapper.find("button#two");
    three = wrapper.find("button#three");
    four = wrapper.find("button#four");
    five = wrapper.find("button#five");
    six = wrapper.find("button#six");
    seven = wrapper.find("button#seven");
    eight = wrapper.find("button#eight");
    nine = wrapper.find("button#nine");
    zero = wrapper.find("button#zero");
    decimal = wrapper.find("button#decimal");
    add = wrapper.find("button#add");
    subtract = wrapper.find("button#subtract");
    multiply = wrapper.find("button#multiply");
    divide = wrapper.find("button#divide");
    clear = wrapper.find("button#clear");
    mode = wrapper.find("button#mode");
    equals = wrapper.find("button#equals");
    modeDisplay = wrapper.find("p#modeDisplay");
    display = wrapper.find("p#display");
    aggregateDisplay = wrapper.find("p#aggregateDisplay");
    mode.simulate("click");
  });

  test("basic function", () => {
    expect(modeDisplay.text()).toMatch(/Immediate/);
    three.simulate("click");
    add.simulate("click");
    four.simulate("click");
    multiply.simulate("click");
    two.simulate("click");
    expect(display.text()).toBe("14");
    expect(aggregateDisplay.text()).toBe("3+4*2");
  });

  test("AC button", () => {
    clear.simulate("click");
    expect(display.text()).toBe("0");
    expect(aggregateDisplay.text()).toBe("");
    expect(modeDisplay.text()).toMatch(/Immediate/);
    six.simulate("click");
    add.simulate("click");
    seven.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("13");
    expect(aggregateDisplay.text()).toBe("6+7=");
    clear.simulate("click");
    expect(display.text()).toBe("0");
    expect(aggregateDisplay.text()).toBe("");
    expect(modeDisplay.text()).toMatch(/Immediate/);
  });

  test("several zeros", () => {
    zero.simulate("click");
    zero.simulate("click");
    zero.simulate("click");
    expect(display.text()).toBe("0");
    expect(aggregateDisplay.text()).toBe("0");
  });

  test("removal of leading zeros", () => {
    zero.simulate("click");
    zero.simulate("click");
    eight.simulate("click");
    zero.simulate("click");
    add.simulate("click");
    zero.simulate("click");
    nine.simulate("click");
    expect(display.text()).toBe("89");
    expect(aggregateDisplay.text()).toBe("80+9");
  });

  test("operand overwrite", () => {
    five.simulate("click");
    add.simulate("click");
    multiply.simulate("click");
    add.simulate("click");
    subtract.simulate("click");
    two.simulate("click");
    divide.simulate("click");
    multiply.simulate("click");
    one.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("3");
    expect(aggregateDisplay.text()).toBe("5+-2*1=");
  });

  test("special handling of the minus/subtract operand", () => {
    five.simulate("click");
    subtract.simulate("click");
    subtract.simulate("click"); //ignored
    subtract.simulate("click"); //ignored
    two.simulate("click");
    subtract.simulate("click");
    add.simulate("click"); //overwrites prev
    two.simulate("click");
    multiply.simulate("click");
    subtract.simulate("click");
    subtract.simulate("click"); // ignored
    add.simulate("click"); //overwrites prev2
    one.simulate("click");
    multiply.simulate("click");
    subtract.simulate("click"); // kept and handled
    one.simulate("click");
    expect(display.text()).toBe("-6");
    expect(aggregateDisplay.text()).toBe("5-2+2+1*-1");
  });

  test("only one decimal per number allowed ", () => {
    five.simulate("click");
    decimal.simulate("click");
    decimal.simulate("click");
    five.simulate("click");
    decimal.simulate("click");
    subtract.simulate("click");
    two.simulate("click");
    decimal.simulate("click");
    two.simulate("click");
    decimal.simulate("click");
    expect(display.text()).toBe("3.3");
    expect(aggregateDisplay.text()).toBe("5.5-2.2");
  });

  test("zero added correctly before decimal", () => {
    decimal.simulate("click");
    five.simulate("click");
    decimal.simulate("click");
    subtract.simulate("click");
    decimal.simulate("click");
    two.simulate("click");
    add.simulate("click");
    two.simulate("click");
    decimal.simulate("click");
    zero.simulate("click");
    expect(display.text()).toBe("2.3");
    expect(aggregateDisplay.text()).toBe("0.5-0.2+2.0");
  });

  test("decimal removed if not followed by a number", () => {
    decimal.simulate("click");
    five.simulate("click");
    add.simulate("click");
    two.simulate("click");
    decimal.simulate("click");
    add.simulate("click");
    two.simulate("click");
    decimal.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("4.5");
    expect(aggregateDisplay.text()).toBe("0.5+2+2=");
  });

  test("equal button", () => {
    equals.simulate("click"); // initial press should do nothing
    expect(display.text()).toBe("0");
    expect(aggregateDisplay.text()).toBe("");
    two.simulate("click");
    add.simulate("click");
    two.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("4");
    expect(aggregateDisplay.text()).toBe("2+2=");
    multiply.simulate("click"); // result should carry forward
    wrapper.find("button#four").simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("16");
    expect(aggregateDisplay.text()).toBe("4*4=");
    two.simulate("click"); // new calculation should start
    add.simulate("click");
    two.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("4");
    expect(aggregateDisplay.text()).toBe("2+2=");
    expect(modeDisplay.text()).toMatch(/Immediate/);
  });

  test("removal of unfinished operand", () => {
    two.simulate("click");
    add.simulate("click");
    one.simulate("click");
    subtract.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("3");
    expect(aggregateDisplay.text()).toBe("2+1=");
  });

  test("zero added if operand is pressed at init", () => {
    add.simulate("click");
    one.simulate("click");
    equals.simulate("click");
    expect(display.text()).toBe("1");
    expect(aggregateDisplay.text()).toBe("0+1=");
  });
});

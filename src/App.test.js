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
  });
});

describe("formula logic tests", () => {
  test("1+1=2", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("2");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("1+1=");
  });

  test("AC button", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#clear").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("0");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("");
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("2");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("1+1=");
    wrapper.find("button#clear").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("0");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("");
  });

  test("several zeros", () => {
    const wrapper = mount(<App />);
    const zero = wrapper.find("button#zero");
    zero.simulate("click");
    zero.simulate("click");
    zero.simulate("click");
    expect(wrapper.find("p#display").text()).toBe("0");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("0");
  });

  test("removal of leading zeros", () => {
    const wrapper = mount(<App />);
    const zero = wrapper.find("button#zero");
    const one = wrapper.find("button#one");
    const add = wrapper.find("button#add");
    zero.simulate("click");
    zero.simulate("click");
    one.simulate("click");
    zero.simulate("click");
    add.simulate("click");
    zero.simulate("click");
    one.simulate("click");
    expect(wrapper.find("p#display").text()).toBe("1");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("10+1");
  });

  test("operand overwrite", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#multiply").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#divide").simulate("click");
    wrapper.find("button#multiply").simulate("click");
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("3");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("5+-2*1=");
  });

  test("special handling of the minus/subtract operand", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#subtract").simulate("click"); //ignored
    wrapper.find("button#subtract").simulate("click"); //ignored
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#add").simulate("click"); //overwrites prev
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#multiply").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#subtract").simulate("click"); // ignored
    wrapper.find("button#add").simulate("click"); //overwrites prev2
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#multiply").simulate("click");
    wrapper.find("button#subtract").simulate("click"); // kept and handled
    wrapper.find("button#one").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("1");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("5-2+2+1*-1");
  });

  test("only one decimal per number allowed ", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("2.2");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("5.5-2.2");
  });

  test("zero added correctly before decimal", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#zero").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("2.0");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("0.5-0.2+2.0");
  });

  test("decimal removed if not followed by a number", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("4.5");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("0.5+2+2=");
  });

  test("equal button", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#equals").simulate("click"); // initial press should do nothing
    expect(wrapper.find("p#display").text()).toBe("0");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("4");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("2+2=");
    wrapper.find("button#multiply").simulate("click"); // result should carry forward
    wrapper.find("button#four").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("16");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("4*4=");
    wrapper.find("button#two").simulate("click"); // new calculation should start
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("4");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("2+2=");
  });

  test("removal of unfinished operand", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("3");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("2+1=");
  });
}); // end of formula logic tests

describe("immediate execution logic tests", () => {
  test("basic function", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("p#modeDisplay").text()).toMatch(/Formula/);
    wrapper.find("button#mode").simulate("click");
    expect(wrapper.find("p#modeDisplay").text()).toMatch(/Immediate/);
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#multiply").simulate("click");
    wrapper.find("button#two").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("4");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("1+1*2");
  });

  test("AC button", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#mode").simulate("click");
    wrapper.find("button#clear").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("0");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("");
    expect(wrapper.find("p#modeDisplay").text()).toMatch(/Immediate/);
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("2");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("1+1=");
    wrapper.find("button#clear").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("0");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("");
    expect(wrapper.find("p#modeDisplay").text()).toMatch(/Immediate/);
  });

  test("several zeros", () => {
    const wrapper = mount(<App />);
    const zero = wrapper.find("button#zero");
    wrapper.find("button#mode").simulate("click");
    zero.simulate("click");
    zero.simulate("click");
    zero.simulate("click");
    expect(wrapper.find("p#display").text()).toBe("");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("0");
  });

  test("removal of leading zeros", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#mode").simulate("click");
    const zero = wrapper.find("button#zero");
    const one = wrapper.find("button#one");
    const add = wrapper.find("button#add");
    zero.simulate("click");
    zero.simulate("click");
    one.simulate("click");
    zero.simulate("click");
    add.simulate("click");
    zero.simulate("click");
    one.simulate("click");
    expect(wrapper.find("p#display").text()).toBe("11");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("10+1");
  });

  test("operand overwrite", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#mode").simulate("click");
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#multiply").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#divide").simulate("click");
    wrapper.find("button#multiply").simulate("click");
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("3");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("5+-2*1=");
  });

  test("special handling of the minus/subtract operand", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#mode").simulate("click");
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#subtract").simulate("click"); //ignored
    wrapper.find("button#subtract").simulate("click"); //ignored
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#add").simulate("click"); //overwrites prev
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#multiply").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#subtract").simulate("click"); // ignored
    wrapper.find("button#add").simulate("click"); //overwrites prev2
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#multiply").simulate("click");
    wrapper.find("button#subtract").simulate("click"); // kept and handled
    wrapper.find("button#one").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("-6");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("5-2+2+1*-1");
  });

  test("only one decimal per number allowed ", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#mode").simulate("click");
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("3.3");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("5.5-2.2");
  });

  test("zero added correctly before decimal", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#mode").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#zero").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("2.3");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("0.5-0.2+2.0");
  });

  test("decimal removed if not followed by a number", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#mode").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#five").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#decimal").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("4.5");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("0.5+2+2=");
  });

  test("equal button", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#mode").simulate("click");
    wrapper.find("button#equals").simulate("click"); // initial press should do nothing
    expect(wrapper.find("p#display").text()).toBe("0");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("4");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("2+2=");
    wrapper.find("button#multiply").simulate("click"); // result should carry forward
    wrapper.find("button#four").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("16");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("4*4=");
    wrapper.find("button#two").simulate("click"); // new calculation should start
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("4");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("2+2=");
    expect(wrapper.find("p#modeDisplay").text()).toMatch(/Immediate/);
  });

  test("removal of unfinished operand", () => {
    const wrapper = mount(<App />);
    wrapper.find("button#mode").simulate("click");
    wrapper.find("button#two").simulate("click");
    wrapper.find("button#add").simulate("click");
    wrapper.find("button#one").simulate("click");
    wrapper.find("button#subtract").simulate("click");
    wrapper.find("button#equals").simulate("click");
    expect(wrapper.find("p#display").text()).toBe("3");
    expect(wrapper.find("p#aggregateDisplay").text()).toBe("2+1=");
  });
});

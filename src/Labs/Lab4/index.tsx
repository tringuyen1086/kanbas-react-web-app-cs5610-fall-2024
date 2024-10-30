import React from "react";
import ReduxExamples from "./ReduxExamples";

import ClickEvent from "./ClickEvent";
import EventObject from "./EventObject";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions"; 
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";

export default function Lab4() {
  // implement callback function
  function sayHello() {
    alert("Hello");
  }
  return (
    <div id="wd-passing-functions">
      <h3>Lab 4</h3>

      <ClickEvent />
      <PassingDataOnEvent />
      {/* pass callback function as a parameter */}
      <PassingFunctions theFunction={sayHello} /> 
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <ReduxExamples />

    </div>
  );
}
  
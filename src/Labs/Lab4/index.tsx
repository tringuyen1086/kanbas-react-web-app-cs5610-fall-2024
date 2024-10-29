import EventObject from "./EventObject";
import PassingFunctions from "./PassingFunctions"; // import the component
export default function Lab4() {
  // implement callback function
  function sayHello() {
    alert("Hello");
  }
  return (
    <div id="wd-passing-functions">
      <h3>Lab 4</h3>

      {/* pass callback function as a parameter */}
      <PassingFunctions theFunction={sayHello} /> 
      <EventObject />
    </div>
  );
}
  
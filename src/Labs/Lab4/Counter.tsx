import React, { useState } from "react";
export default function Counter() {
    // let count = 7;
    const [count, setCount] = useState(7);
    console.log(count);
    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => setCount(count + 1)}
                    id="wd-counter-up-click"
                    className="btn btn-success mx-1">Up</button>
            <button onClick={() => setCount(count - 1)}
                    id="wd-counter-down-click"
                    className="btn btn-danger">Down</button>
            <hr/>
        </div>
    );
}


/* export default function Counter() {
    let count = 7;
    console.log(count);
return (
    <div id="wd-counter-use-state">
        <h2>Counter: {count}</h2>
        <button
            onClick={() => { count++; console.log(count); }}
            id="wd-counter-up-click">
            Up
        </button>
        <button
            onClick={() => { count--; console.log(count); }}
            id="wd-counter-down-click">
            Down
        </button>
        <hr/>
    </div>
    );
} */

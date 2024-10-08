export default function IfElse(){
    let true1 = true, false1 = false;
    return(
        <div id="wd-if-else">
        <h4>If Else</h4>
        {/* Render true1 paragraph only if true1 is true */}
        { true1 && <p>true1</p> }
        {/* Use a ternary operator to render one of two options based on the value of false1 */}
        { !false1 ? <p>!false1</p> : <p>false1</p> } <hr />
        </div>
    );
}
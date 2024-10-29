export default function PassingFunctions(
// function passed in as a parameter
{ theFunction }: { theFunction: () => void }) {
    return (
    <div>
        <h2>Passing Functions</h2>
        {/* invoking function with no arguments */}
        <button onClick={theFunction} className="btn btn-primary">
        Invoke the Function
        </button>
        <hr/>
        </div>
);}

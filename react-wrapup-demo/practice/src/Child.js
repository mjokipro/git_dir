import React, {memo} from "react";

const Child = memo(({color="lilac", reset}) => {
console.debug("re-rendering child")


    return (
        <div>
            <p style={{color}}>Child</p>
            <button onClick={reset}>Reset (in parent)</button>
        </div>
    )
})

export default Child;
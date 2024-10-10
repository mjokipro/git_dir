import {useState} from "react"



const Counter = () => {
    const [count, setCount] = useState(99)
    return (
        <>
            <h1>Count:  {count}</h1>
            <button onClick={() => setCount(count + 1)}>Add</button>
        </>
    )
}


export default Counter
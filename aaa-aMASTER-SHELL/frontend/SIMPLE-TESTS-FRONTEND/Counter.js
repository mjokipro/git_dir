import {useState} from "react"

const Counter = () => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <h1>Let's count!</h1>
            <h2>Current Count:  { count }</h2>
            <button onClick={increment}>Add</button>
            <label htmlFor="user">Username</label>
            <input id="user" type="text" placeholder="username" />
        </div>
    )
}

export default Counter
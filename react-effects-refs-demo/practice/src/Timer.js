import React, {useState, useEffect, useRef} from "react"

const Timer = () => {
    const [seconds, setSeconds] = useState(0)
    console.log('RE-RENDERING', seconds)
    // useEffect(() => {
    //     setInterval(() => {
    //         setSeconds(seconds => seconds + 1)
    //     }, 500)
    // }, [])
    return <h1>{seconds}</h1>
}

export default Timer
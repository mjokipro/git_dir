const RandomRange = ({min = 1, max = 10}) => {
    const rand = Math.floor(Math.random() * (max - min)) + min
    return <h1>Random number:  { rand }</h1>
}
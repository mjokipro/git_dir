const RandomNumRange = ({ min = 1, max = 10 }) => {
  const rand = Math.floor(Math.random() * (max - min)) + min;
  return <h1>Rand Is: {rand}</h1>
}





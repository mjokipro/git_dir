import {useState} from "react"
import NumberItem from "./NumberItem"

const genId = () => Math.random() * 1000000

const NumberList = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4])
  const remove = (num) => {
    setNumbers(numbers.filter(n => n !== num))
  }

  return (
    <ul>
      {numbers.map(n => (
        <NumberItem num={n} remove={remove} key={genId} />
        // <NumberItem num={n} remove={() => remove(n)} />
      ))}
    </ul>
  )

}


export default NumberList
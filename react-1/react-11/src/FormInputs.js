import './App.css';
import {useState} from 'react';

const FormInputs = ({storyState}) => {
const INIT_STATE = {}

const [formData, setFormData] = useState(INIT_STATE)

const handleInputs = (e) => {
  const {name, value} = e.target
  setFormData({...formData, [name]: value})
}

const handleSubmit = (e) => {
  e.preventDefault()
  storyState({...formData})
  setFormData(INIT_STATE)
}

return (
  <div>
    <h1>Madlibs!</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstNoun">Enter a noun</label>
      <input
        type="text"
        id="firstNoun"
        name="firstNoun"
        onChange={handleInputs} required></input>

      <label htmlFor="secondNoun">Enter a noun</label>
      <input
        type="text"
        id="secondNoun"
        name="secondNoun"
        onChange={handleInputs} required></input>

      <label htmlFor="adj">Enter an adjective</label>
      <input
        type="text"
        id="adj"
        name="adj"
        onChange={handleInputs} required></input>

      <label htmlFor="verb">Enter a verb</label>
      <input
        type="text"
        id="verb"
        name="verb"
        onChange={handleInputs} required></input>

        <button type='submit'>Submit</button>
    </form>
  </div>
)

}

export default FormInputs;

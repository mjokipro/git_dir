import './App.css';
import {useState} from 'react';

const FormInputs = ({storyState}) => {
    const INIT_STATE = {};

    const [formData, setFormData] = useState(INIT_STATE);

    //handle input changes
    const handleFormInputs = (evt) => {
        const {name, value} = evt.target;
        setFormData({...formData, [name]:value});
        // console.log(formData);
    }
    //call 
    const submitForm = (evt) => {
        evt.preventDefault();
        storyState({...formData});
        console.log(formData)
        setFormData(INIT_STATE);
    }

  return (
    <div className="App">
      <h1>Madlibs!</h1>
      <form onSubmit={submitForm}>
        <label htmlFor='nounOne'>Enter a Noun: </label>
        <input type='text' id='nounOne' name='nounOne' onChange={handleFormInputs} required></input>

        <label htmlFor='nounTwo'>Enter another Noun: </label>
        <input type='text' id='nounTwo' name='nounTwo' onChange={handleFormInputs} required></input>

        <label htmlFor='adjective'>Enter an Adjective:</label>
        <input type='text' id='adjective' name='adjective' onChange={handleFormInputs} required></input>

        <label htmlFor='verb'>Enter a fanciful Verb: </label>
        <input type='text' id='verb' name='verb' onChange={handleFormInputs} required></input>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default FormInputs;

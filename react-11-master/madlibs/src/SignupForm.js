import React from 'react';
import useFields from './hooks/useFields';
import useToggleState from './hooks/useToggleState'
import Story from './Story';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const SignupForm = () => {
    const [formData, handleChange, resetForm] = useFields({
        adjective: '',
        verb: '',
        noun: '',
        adverb: ''
    })
    const handleSubmit = e => {
        e.preventDefault();
        if (!formData.adjective || !formData.verb || !formData.noun || !formData.adverb) {
            alert('Hey. Fill all the boxes!');
            return
        }
        /*resetForm();*/
        toggleHasBeenSubmitted();
        toggleIsGenerated();
        toggleIsFormFilled();
    }
    const [hasBeenSubmitted, toggleHasBeenSubmitted] = useToggleState(false);
    const [isGenerated, toggleIsGenerated] = useToggleState(false)
    const [isFormFilled, toggleIsFormFilled] = useToggleState(false)
    return (
        <>
            
            {isFormFilled ? <div></div> : <Alert severity="warning">Fill all fields before submitting</Alert> }
            {isGenerated && hasBeenSubmitted ? <Story adj={ formData.adjective} verb={ formData.verb} noun={ formData.noun} adverb={ formData.adverb } /> : <div></div>}
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="adjective"
                value={formData.adjective}
                onChange={handleChange}
                placeholder="adjective"
            />
            <input
                type="text"
                name="verb"
                value={formData.verb}
                onChange={handleChange}
                placeholder="verb(ing)"
            />
            <input
                type="text"
                name="noun"
                value={formData.noun}
                onChange={handleChange}
                placeholder="noun"
            />
            <input
                type="text"
                name="adverb"
                value={formData.adverb}
                onChange={handleChange}
                placeholder="adverb"
            />
            <button>Submit</button>
        </form>
            {hasBeenSubmitted ? <button onClick={toggleIsGenerated}>{isGenerated ? 'Hide Story' : 'Show Story'}</button> : <div />}
            {hasBeenSubmitted ? <button onClick={resetForm}>Reset Form</button> : <div />}
        </>
    )
}

export default SignupForm;
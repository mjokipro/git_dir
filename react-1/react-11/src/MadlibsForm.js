import './App.css';
import {useState} from 'react';
import FormInputs from './FormInputs';
import StoryContent from './StoryContent';

const MadlibsForm = () => {

const INIT_STATE = []
const [story, setStory] = useState([])

const updateStory = (formData) => {
    setStory([...story, formData])
}

const deleteStories = () => {
    setStory(INIT_STATE)
}

const setStories = story.map((story, i) => {
    return <StoryContent 
        key={i}
        firstNoun={story.firstNoun}
        secondNoun={story.secondNoun}
        adj={story.adj}
        verb={story.verb}
        removeStories={deleteStories}
        />
})

    return (
        <div>
            <FormInputs storyState={updateStory}/>
            {setStories}
        </div>
    )
}

export default MadlibsForm;

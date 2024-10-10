import './App.css';
import {useState} from 'react';
import FormInputs from './FormInputs';
import StoryContent from './StoryContent';

function MadlibsForm() {
  //We store the story here, and pass it as a prop to
  //StoryComponent
  const INIT_STATE = [];

  const [story, setStory] = useState([]);

  const updateStoryState = (formData) => {
      console.log('incoming form data', formData)
      setStory([...story, formData]);
  }

  const clearStories = () => {
      setStory(INIT_STATE);
  }

  const renderStories = story.map((story,idx) => {
      return <StoryContent key={idx} 
                          nounOne={story.nounOne} 
                          nounTwo={story.nounTwo} 
                          adjective={story.adjective}
                          verb={story.verb}
                          removeStories={clearStories} />
    })


  return (
    <div className="App">
      <FormInputs storyState={updateStoryState}/>
      {renderStories}
    </div>
  );
}

export default MadlibsForm;

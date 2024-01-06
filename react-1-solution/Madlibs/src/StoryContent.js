import './App.css';

function StoryContent({id, nounOne, nounTwo, adjective, verb, removeStories}) {
  //story is an object with two nouns, an adjective, and a color
  //console.log(story)

  const storiesDisappear = () => removeStories();

  return (
    <div className="App">
       <p>The {nounOne} was very {adjective} towards the {verb} {nounTwo}</p>
       <button onClick={storiesDisappear}>Remove Stories</button>
    </div>
  );
}

export default StoryContent;

import './App.css';

function StoryContent({id, firstNoun, secondNoun, adj, verb, removeStories}){
  const clearStories = () => removeStories()

  return (
    <div>
      <p>
        The {firstNoun} was very {adj} towards the {verb} {secondNoun}
      </p>
      <button onClick={clearStories}>Remove Stories</button>
    </div>
  )
}


export default StoryContent;

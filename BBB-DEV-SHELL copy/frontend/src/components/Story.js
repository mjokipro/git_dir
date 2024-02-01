import React from "react";

import './Story.css'
import StoryContainer from './StoryContainer'

const Story = ({ adj, adverb, noun, verb }) => {
  
  
    return (
        <>
            <StoryContainer adj={adj} adverb={adverb} noun={noun} verb={verb }/>
        <div>

      <p>Here is your story!</p>
               
      
      
        </div>
            
    </>
  )
}

export default Story;// JavaScript source code

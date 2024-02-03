import React from "react";

const ScriptureCard = ({key, book_name, chapter, verse, text}) => {
    
    return (
        <div className="container">            <h1><span>{book_name} {chapter}: {verse}</span></h1>        
            <p className="lead">{text}</p>
        </div>
    )
}

export default ScriptureCard
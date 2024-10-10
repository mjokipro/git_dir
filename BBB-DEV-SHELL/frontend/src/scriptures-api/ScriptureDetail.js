import React from "react";

const ScriptureDetail = ({id, book_name, chapter, text}) => {

    return (
        <div className="container">
            <h2>Book</h2>
            <h2>{book_name}</h2>
            <h2>{chapter}</h2>
        </div>
    )
}

export default ScriptureDetail
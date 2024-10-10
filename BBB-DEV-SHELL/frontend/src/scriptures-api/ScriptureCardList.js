import React from "react";
import ScriptureCard from "./ScriptureCard";

const ScriptureCardList = ({scriptures}) => {

    return (
        <div className="mb-2">
            {scriptures.verses.map(v => (
                <ScriptureCard 
                    key={v.id}
                    book_name={v.book_name}
                    chapter={v.chapter}
                    verse={v.verse}
                    text={v.text}
                />
            ))}
        </div>
    )
}

export default ScriptureCardList
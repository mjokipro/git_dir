import React, { useEffect, useState } from "react";
import Axios from "axios";
import ScriptureCardList from './ScriptureCardList'

const BIBLE_BASE_URL="https://bible-api.com/romans 12:1-2,5-7,9,13:1-9&10"

const ScriptureList = () => {

const [scriptures, setScriptures] = useState()
console.debug("ScripturesList=", scriptures)

useEffect(() => {
    searchFor()
    }, [BIBLE_BASE_URL])
    
    async function searchFor(id){
        let results = await Axios.get(`${BIBLE_BASE_URL}`)
        let scriptures = results.data
        setScriptures(scriptures)
    }

    if(!scriptures) return <p>Loading...</p>

    console.debug("Scriptures=", scriptures.verses[0].text)

    return (
        <div className="container mt-1">
            <ScriptureCardList scriptures={scriptures}/>
        </div>
    )
}

export default ScriptureList
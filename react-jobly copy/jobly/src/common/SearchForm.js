import React, {useState} from 'react'

const SearchForm = ({searchFor}) => {
    const [searchTerm, setSearchTerm] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        searchFor(searchTerm.trim() || undefined)
        setSearchTerm(searchTerm.trim())
    }

    function handleChange(e){
        setSearchTerm(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='searchTerm'>Search Term</label>
                <input 
                    name="searchTerm"
                    placeholder='Enter search term...'
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SearchForm
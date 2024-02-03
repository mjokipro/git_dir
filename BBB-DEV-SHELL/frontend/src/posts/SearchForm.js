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
        <div className='container'>
            <form className="form-group" onSubmit={handleSubmit}>
                <input 
                    className="form-control"
                    name="searchTerm"
                    placeholder='Enter search term...'
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button className="btn btn-secondary mt-2" type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SearchForm
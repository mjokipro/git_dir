import React, {useState} from "react";
import {v4 as uuid} from 'uuid'

const NewBoxForm = ({addNewBox}) => {
const [formData, setFormData] = useState({
    height: '',
    width: '',
    backgroundColor: '',
})

const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(formData => ({...formData, [name]: value}))
}

const handleSubmit = (e) => {
    e.preventDefault()
    addNewBox({...formData, id: uuid()})
    setFormData({height: "", width: "", backgroundColor: ""})
}


    return (
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="height">Height</label>
                <input 
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                />
            </div>
            <div>
            <label htmlFor="width">Width</label>
            <input 
                type="text"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleChange}
                />
            </div>
            <div>
            <label htmlFor="backgroundColor">Background Color</label>
            <input 
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
                />
            </div>
            <button>Add</button>
        </form>
    )
}

export default NewBoxForm
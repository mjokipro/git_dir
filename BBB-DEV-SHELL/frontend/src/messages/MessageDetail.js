import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import JoblyApi from '../api/api'

const MessageDetail = () => {
    const {id} = useParams()
    const [message, setMessage] = useState(null)
    console.debug("message detail", message)

    useEffect(
    function getMessage(){
        getM()
    }, [id])
    
    async function getM(){
        const message = await JoblyApi.getMessage(id)
        setMessage(message)
    }

    if (!message) return <p>Loading...</p>

    return (
        <div className='container card'>
            <h1>From User (me):</h1>
           <p className='lead'>{message.from_user}</p>
           
            <h2>To User (you):</h2>
           <p className='lead'>{message.to_user}</p>

            <h4>From First Name: (you):</h4>
           <p className='lead'> {message.from_first_name}</p>

            <h4>To First Name (you):</h4>
           <p className='lead'> {message.to_first_name}</p>

            <h4>Body:</h4>
           <p className='lead'> {message.body}</p>

           <Link to={`/messages`}>
                <button className=' btn btn=small mb-2 btn-secondary'>Back</button>
           </Link>
       
        </div>
    )
}

export default MessageDetail
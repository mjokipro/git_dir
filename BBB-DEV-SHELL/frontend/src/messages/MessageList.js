import React, {useState, useEffect} from 'react'
import MessageCard from './MessageCard'
import JoblyApi from '../api/api'
import NewMessageForm from './NewMessageForm'

function MessageList(){
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState([])
    
    useEffect(
        function getMessagesInit(){
            search()
        }, [])

        async function search(id) {
            setMessages(await JoblyApi.getAllMessages(id))
        }
        console.debug("MessageList, messages=",  "message=", message)
        
        async function addP(data){
            let message = await JoblyApi.postMessage(data)
            console.log(message)
            setMessage(message)
          }
    
if (!messages) return <p>Loading...</p>

    return (
        <div className='container'>
            <NewMessageForm addP={addP} />
            {messages.length 
                ? (
                    <div className='lead'>
                        {messages.map(m => (
                            <MessageCard 
                            key={m.id}
                            id={m.id}
                            from_user={m.from_user}
                            to_user={m.to_user}
                            body={m.body}
                            />
                           ))
                        }
                    </div>
                ) : (<p>No results</p>)
            }
        </div>
    )
}

export default MessageList
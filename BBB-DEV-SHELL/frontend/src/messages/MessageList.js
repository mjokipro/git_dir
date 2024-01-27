import React, {useState, useEffect} from 'react'
import MessageCard from './MessageCard'
import SearchForm from '../common/SearchForm'
import JoblyApi from '../api/api'

function MessageList(){
    console.debug("MessageList")
    const [messages, setMessages] = useState(null)

    useEffect(
        function getMessagesInit(){
            search()
        }, []
    )

    async function search(id) {
        let messages = await JoblyApi.getAllMessages(id)
        console.log(messages)
        setMessages(messages)
    }

if (!messages) return <p>Loading...</p>

    return (
        <div className='modal-dialog modal-lg'>
            <div>
            <SearchForm searchFor={search}/>
            </div>
            {messages.length 
                ? (
                    <div>
                        {messages.map(m => (
                            
                            <MessageCard 
                            // messages={m.messages}
                            key={m.id}
                            id={m.id}
                                // name={m.from_user}
                                // value={m.from_user}
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
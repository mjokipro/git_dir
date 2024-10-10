import React, {useState, useEffect} from 'react'
import MessageDetail from './MessageDetail'
import SearchForm from '../common/SearchForm'
import MessagelyApi from '../api/api'

function MessageList(){
    console.debug("message list")
    const [messages, setMessages] = useState(null)

    useEffect(
        function getMessagesInit(){
            search()
        }, []
    )

    async function search(id) {
        let messages = await MessagelyApi.getMessages(id)
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
                            <MessageDetail 
                            messages={m.messages}
                                // key={m.id}
                                // from_username={m.from_username}
                                // to_username={m.to_username}
                                // body={m.body}
                                // sent_at={m.sent_at}
                                // read_at={m.read_at}
                            />))
                        }
                    </div>
                ) : (<p>No results</p>)
            }
        </div>
    )
}

export default MessageList
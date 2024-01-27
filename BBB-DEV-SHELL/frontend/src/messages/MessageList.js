import React, {useState, useEffect} from 'react'
import MessageCard from './MessageCard'
import SearchForm from '../common/SearchForm'
import JoblyApi from '../api/api'
import NewMessageForm from '../forms/NewMessageForm'
import { Link } from 'react-router-dom'

function MessageList(){
    console.debug("MessageList")
    const [messages, setMessages] = useState(null)
    // const [message, setMessage] = useState(null)

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

  // add a new todo
    async function create(message){
        setMessages(messages => [...messages, message]);
    };

  // update a todo with updatedTask
  const update = (id, to_user, from_user, body) => {
    setMessages(messages =>
      messages.map(todo =>
        todo.id === id ? { ...todo, to_user: to_user, from_user: from_user, body: body } : todo

      )
    );
  };

  // delete a todo by id
  const remove = id => {
    setMessages(messages => messages.filter(todo => todo.id !== id));
  };
    
if (!messages) return <p>Loading...</p>

    return (
        <div className='modal-dialog modal-lg'>
            <div>
            <SearchForm searchFor={search}/>
            </div>
            <div>
            <NewMessageForm 
                create={create}
                update={update} 
                remove={remove}
                />
            </div>
            {messages.length 
                ? (
                    <div>
                        {messages.map(m => (
                            // <Link to={`/messages/${m.id}`}>
                            <MessageCard 
                            // messages={m.messages}
                            key={m.id}
                            id={m.id}
                                name={m.from_user}
                                value={m.from_user}
                                from_user={m.from_user}
                                to_user={m.to_user}
                                body={m.body}
                            />
                            // </Link>
                           ))
                        }
                    </div>
                ) : (<p>No results</p>)
            }
        </div>
    )
}

export default MessageList
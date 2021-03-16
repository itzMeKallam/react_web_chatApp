import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';
import Styles from './chat.module.css'

let socket
let name, room
const Chat =()=>{
    const [message, setMessage] = useState(null)
    const [messages, setMessages] = useState([])
    const [userError,setUserError] = useState(false)
    const PORT = 'http://localhost:8080'
    const history = useHistory()

    useEffect(() => {
        socket = io(PORT)
        
        if(!JSON.parse(localStorage.getItem('room'))){
            localStorage.setItem('room', JSON.stringify({
                        name: '',
                        room: ''
                    }))
        }

         ({ name, room } = JSON.parse(localStorage.getItem('room')))
         

        socket.on('message', (message)=>{
            setMessages(messages => [ ...messages, message ]);
        })
    }, [])

    useEffect(()=>{
        socket.emit('join', {name, room}, (error)=>{
            if(error){
                setUserError(true)
            } else{
                setUserError(false)
            }
        })

        return ()=>{
            socket.disconnect()
            socket.off()
        }
    }, [PORT])

    

    const closeChat=()=>{
        localStorage.setItem('room', JSON.stringify({
            name: '',
            room: ''
        }))
        socket.disconnect()
        socket.off()
        history.push('/')
    }

    const sendMessage=()=>{
        if(message){
            socket.emit('message' , message, ()=> setMessage(''))
        }
    }


    const messageList = messages.map(({user, text}, index)=> user === name ?  (
        <li key={index} className={Styles.right}><h5>{user}</h5><hr /><p>{text}</p></li>
    ) : (
        <li key={index} className={Styles.left}><h5>{user}</h5><hr /><p>{text}</p></li> 
    ))
    
    
    
   
    
    return (
        <div className={Styles.chat}>
            <div className={Styles.card}>
                { userError ? (
                    <div className={Styles.errorCard}>
                        <h4>Unauthorised access</h4>
                        <button className={Styles.error} onClick={closeChat}>GoBack</button>
                    </div>
                ) : (
                    <div>
                    <ScrollToBottom className={Styles.messageBox}>
                    <ul>{messageList}</ul>
                    </ScrollToBottom>
                    <div className={Styles.inputMessage}>
                        <input type="text" placeholder="Enter message..." value={message} onChange={(e)=>setMessage(e.target.value)}/>
                        <button onClick={sendMessage} className={Styles.send}>Send</button>
                        <button onClick={closeChat} className={Styles.close}>Close</button>
                    </div>
                </div>
                ) }
                
            </div>
        </div>
    )
}

export default Chat
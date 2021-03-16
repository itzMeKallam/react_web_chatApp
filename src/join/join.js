import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import io from 'socket.io-client'
import Styles from './join.module.css'
let socket
const Join=()=>{
    const PORT = 'http://localhost:8080'
    const history = useHistory()
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [userError,setUserError] = useState(false)
    const join=()=>{
        socket = io(PORT)
        socket.emit('checkUserInRoom', {name, room}, (error)=>{
            if(error){
                setUserError(true)
            }
            else{
                socket.disconnect()
                socket.off()
                localStorage.setItem('room', JSON.stringify({
                    name: name,
                    room: room
                }))
                setName('')
                setRoom('')
                history.replace('/chat')
            }
        })
        
    }
   
    return (
        <div className={Styles.join}>
            <div className={Styles.card}>
                {userError ? (<div className={Styles.error}>
                    <h4>Username already taken</h4>
                </div>) : null}
                
                <input placeholder="User name" value={name} type="text" onChange={e=> setName(e.target.value)}/>
                <input placeholder="Room name" value={room} type="text" onChange={e=> setRoom(e.target.value)}/>
                <button onClick={join}>Join</button>   
            </div>
        </div>
    )
}

export default Join
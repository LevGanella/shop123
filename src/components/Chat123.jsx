import React, { useEffect, useState  } from "react";
import { io } from 'socket.io-client'

const Chat123 = () => {
    const [message,setMessage] = useState('')
    const [messages,setMessages]=useState([])
    const [chat,setChat]=useState([])
    const [socket,setSocket] = useState(null)
    useEffect(()=>{
        const socket123 = io('https://shop123.vercel.app:8080');

        socket123.on('connect', () => {
            console.log('Connected, Socket ID:', socket123.id);
            
            const username = localStorage.getItem('LogIn')
            if(username==="1"){
                setSocket(socket123)
                socket123.emit('join', '1',true)
                fetch("http://localhost:5000/getchats",{
                    method:"GET",
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>res.json())
                .then(data=>{
                    setChat(data)
                    console.log(data)
                })

            }
            else{
                setSocket(socket123)
                socket123.emit('join', username,false)
                fetch("http://localhost:5000/messagesPrint",{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(
                        {
                        chat:`messages/${localStorage.getItem('LogIn')}`
                        }
                    )
                })
                .then(res=>res.json())
                .then(data=>{
                    
                    
                    setMessages(data)
                    
                    
                })
            }

            
        })

    


        
        return () => {
                    socket123.disconnect(); 
                }
    },[])
    
    const OnSend = () => {
        
        if(socket){
            
            const message123 = {
                text: message,
                name: localStorage.getItem('LogIn'),
                chat:namechat
            }
            
            
            socket.emit('send_message', message123)
           
            setMessages([...messages, message123]);
            setMessage('')
            
    }
}


    useEffect(()=>{
        if(socket){
            
            socket.on('receive_message', (data) => {
                console.log("data",data)
                
                
                fetch('http://localhost:5000/messagesAdd',{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(
                        {
                            chat:data.chat,
                            name:data.name,                            
                            text:data.text
                        }
                    )
                        
                    
                    
                })

                fetch("http://localhost:5000/messagesPrint",{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(
                        {
                        chat:data.chat
                        }
                    )
                })
                .then(res=>res.json())
                .then(data=>{
                    
                    
                    setMessages(data)
                    
                    
                })

            })
            
    }
    },[socket])
    const [namechat,setNamechat]=useState('')

    const OnclickChat=(name)=>{
        setNamechat(name)
        fetch("http://localhost:5000/messagesPrint",{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(
                        {
                        chat:name
                        }
                    )
                })
                .then(res=>res.json())
                .then(data=>{
                    
                    
                    setMessages(data)
                    
                    
                })

    }
    
    return (
        <div className="chat-container">
        {localStorage.getItem('LogIn')==="1"?(
            <div>
                <div>
                    {chat.map((cht, index) =>(
                        <button key={index} onClick={()=>OnclickChat(cht.name)}>{cht.name}</button>
                    ))}
                </div>
                <div>
                    {namechat!=""?(
                        <div>
                            <h1>{namechat}</h1>
                            <div className="chatandmess">
                                <div className="messages">
                                    <h1 className="starts">Starts</h1>
                                {messages.map((mes, index) => (
                                    
                                    localStorage.getItem('LogIn')===mes.name?(
                                    <div className="your-message" key={index}>
                                    {mes.name}:{mes.text}
                                    </div>
                                    ):(
                                    <div className="notyour-message" key={index}>
                                    {mes.name}:{mes.text}
                                    </div>
                                    )
                                    
                                ))}
                                <div className="new-message">
                                        <input
                                            type="text"
                                            className="message-input"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <button className="send-button" onClick={OnSend}>Send</button>
                                    </div>
                                </div>
                                </div>
                        </div>
                    ):
                    (
                        <div>

                        </div>
                    )
                    }
                </div>
            </div>
        ):(

        <div>
            <h1></h1>
                <div className="chatandmess">
                                <div className="messages">
                                    <h1 className="starts">Starts</h1>
                                {messages.map((mes, index) => (
                                    
                                    localStorage.getItem('LogIn')===mes.name?(
                                    <div className="your-message" key={index}>
                                    {mes.name}:{mes.text}
                                    </div>
                                    ):(
                                    <div className="notyour-message" key={index}>
                                    {mes.name}:{mes.text}
                                    </div>
                                    )
                                    
                                ))}
                                <div className="new-message">
                                        <input
                                            type="text"
                                            className="message-input"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <button className="send-button" onClick={OnSend}>Send</button>
                                    </div>
                                </div>
                                </div>
            </div> 

        )}
          
        </div>
      )
      
}

export default Chat123

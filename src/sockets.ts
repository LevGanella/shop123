import {Server} from "socket.io"
const io = new Server(8080,{
    cors:{
        origin: "https://shop123.vercel.app",
        methods: ["GET", "POST"]

    }

})

io.on("connection", (socket) => {
    console.log('con',socket.id)
    
    socket.on("join",(username,bool)=>{
        if(bool){
            socket.join("1")
            console.log('Admin joined',socket.id)
        }
        else{
            
            socket.join(`messages/${username}`)
            console.log('User joined',username)
        }
    })
    socket.on("disconnect",()=>{
        console.log('dis',socket.id)
    })
    socket.on("send_message",(data)=>{
        
        if(data.name!="1"){
            data.chat = `messages/${data.name}`
            socket.to(data.chat).emit("receive_message",data)
            socket.to("1").emit("receive_message",data)
            console.log("клиент отправил сообщение",data)
        }
        else{
            
            socket.to(data.chat).emit("receive_message",data)
            socket.to("1").emit("receive_message",data)
            console.log("админ отправил сообщение",data)
        }
        
    })
})

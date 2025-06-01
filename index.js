const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);


const socket = socketIo(server);

app.use(express.static('public'));

socket.on('connection',(socket)=>{

    console.log("user connected: " + socket.id);

    socket.on('message',(data)=>{
        console.log(data);
        
        const payload = {
            'msg': data,
            'socket_id': socket.id,
        }
        socket.broadcast.emit('message',payload);

    });


    socket.on('disconnect',()=>{

        console.log("User Disconnected ", socket.id);
        
    });


    socket.on('answer',(data)=>{
        socket.broadcast.emit('answer',data);
    });


    socket.on('offer',(data)=>{
        socket.broadcast.emit('offer',data);
    });

    socket.on('ice-candidate',(data)=>{
        socket.broadcast.emit('ice-candidate', data);
    });

});


server.listen(3000, '0.0.0.0', ()=>{
    console.log("Server Running on 3002");
}) //192.168.1.12
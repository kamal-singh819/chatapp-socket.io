import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room ${data}`);
        // socket.broadcast.emit('receive_message', data)
    });
    socket.on('send_message', (data) => {
        console.log(data); //here server received the message from a client, now server will send this message to another client
        socket.to(data.roomId).emit("receive_message", data);
    })

    socket.on('disconnect', () => console.log('User disconected', socket.id));
});

server.listen(5500, () => console.log('Server is listening on the port 5500'));
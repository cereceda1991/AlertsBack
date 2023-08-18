const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'], 
}));

app.get('/', (req, res) => {
    res.send('¡El servidor WebSocket está en línea!');
});

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('notification', ({ message, type }) => {
        console.log('Notificación recibida:', message, type);
        io.emit('newNotification', { message, type }); 
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor en línea en el puerto ${PORT}`);
});

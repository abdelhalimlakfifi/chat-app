const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});


const io = require('socket.io')(server);



app.use(express.static(path.join(__dirname, 'public')))


let socketsConnected = new Set();

io.on('connection', onConnected);


function onConnected(socket)
{
    console.log(socket.id);
    socketsConnected.add(socket.id);


    io.emit('clients-total', socketsConnected.size);

    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id);
        socketsConnected.delete(socket.id);

        io.emit('clients-total', socketsConnected.size);
    });


    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('chat-message', data)  // i should ask about broadcast
    });



    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
    })
}
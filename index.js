const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server);

const publicPath = path.resolve(__dirname, 'public');
const port = process.env.PORT || 3030;

app.use(express.static(publicPath));

io.on('connection', function (client) {
    console.log('Cliente conectado.');

    client.on('disconnect', function () {
        console.log('Cliente desconectado');
    })
})

server.listen(port, () => {
    console.log('Server: ON, Puerto: ', port);
})
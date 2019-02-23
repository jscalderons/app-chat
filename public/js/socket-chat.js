const socket = io();
const params = new URLSearchParams(location.search);

if (!params.has('username') || !params.has('room')) {
    location = 'index.html';
    throw new Error('El nombre de usuario es necesario');
}

const user = {
    username: params.get('username'),
    room: params.get('room')
}

socket.on('connect', function () {
    console.log('Conectado al servidor.');

    socket.emit('register', user, (users) => {
        console.log(users);  
    })
});

socket.on('list', function (users) {
    console.log(users);
});

socket.on('message', function (res) {
    console.log(`${res.username}: ${res.message}`);
});

socket.on('disconnect', function () {
    console.log('Se perdió la conexión con el servidor.');
});
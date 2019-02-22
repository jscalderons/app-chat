const socket = io()

socket.on('connect', function () {
    console.log('Conectado al servidor.')
})
socket.on('disconnect', function () {
    console.log('Se perdió la conexión con el servidor.');
})
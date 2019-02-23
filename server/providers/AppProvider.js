const UserController = require('./../controllers/UserController');
const message = require('./../traits/MessageTrait');
const response = require('./../traits/ResponseTrait');

const UserCtrl = new UserController();

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (client) => {

        client.on('register', (data, callback) => {
            if (!data.username || !data.room) {
                return callback(response())
            }

            client.join(data.room);

            UserCtrl.add(client.id, data.username, data.room);

            const users = UserCtrl.listByRoom(data.room);

            client.broadcast.to(data.room).emit('list', users);

            callback(response(users));
        })

        client.on('message', (text, from = null) => {
            const user = UserCtrl.get(client.id);
            let broadcast = client.broadcast;

            if (from) {
                broadcast = broadcast.to(from);
            } else {
                broadcast = broadcast.to(user.room);
            }

            broadcast.emit('message', message(user.username, text));
        })

        client.on('disconnect',  () => {
            const user = UserCtrl.delete(client.id);

            client.broadcast.to(user.room).emit('message', message('system', `El usuario ${user.username} a salido del chat.` ));

            client.broadcast.to(user.room).emit('list', UserCtrl.listByRoom(user.room));
        })
    })

    return io;
}
const User = require('./../classes/User');

class UserController {
    constructor() {
        this.users = []
    }

    list() {
        return this.users;
    }

    listByRoom(room) {
        return this.users.filter(user => user.room == room)
    }

    add(id, username, room) {
        const user = new User(id, username, room);

        this.users.push(user);

        return user;
    }

    get(id) {
        return this.users.find(user => user.id === id);
    }

    delete(id) {
        const user = this.get(id);

        this.users = this.users.filter(user => user.id != id);

        return user;
    }
}

module.exports = UserController;
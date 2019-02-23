require('./server/config/app');
const server = require('./server/server');

server.listen(process.env.PORT, () => {
    console.log('Server: ON, Puerto: ', process.env.PORT);
});
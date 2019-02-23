module.exports = (username = '', message = '') => ({
    username,
    message,
    date: new Date().getTime()
})
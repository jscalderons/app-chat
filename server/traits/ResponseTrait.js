module.exports = (data = null, errors = []) => ({
    ok: (errors) ? false : true,
    errors,
    data
})
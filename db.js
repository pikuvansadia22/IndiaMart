const mongoose = require('mongoose')
const opts = {
    uri: "mongodb://127.0.0.1:27017/india_mart",
    options: {
        "useNewUrlParser": true,
        "useUnifiedTopology": true
    }
}

const initiateDbConnection = async () => {
    try {
        global.db = await mongoose.connect(opts.uri, opts.options)
        console.debug('Connection to db successful!')
    } catch (error) {
        console.error('Connection to db failed!')
        throw error
    }
}

module.exports = {
    initiateDbConnection
}
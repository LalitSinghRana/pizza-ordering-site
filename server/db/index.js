const mongoose = require('mongoose');
const env = require('dotenv').config({ path: '../.env' });

mongoose
    .connect(`mongodb+srv://lalit:${env.parsed.MONGODB_PASSWORD}@cluster0.r8vrarm.mongodb.net/`, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
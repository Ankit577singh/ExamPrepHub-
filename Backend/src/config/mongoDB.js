const mongoose = require('mongoose');

async function mongoDB() {
    mongoose.connect(process.env.MONGO_DB_URL);
}

module.exports = mongoDB;
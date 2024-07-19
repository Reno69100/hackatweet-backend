require('./connection');
const mongoose = require('mongoose');


const trendSchema = mongoose.Schema({
    name:String,
    nbTweets: Number,
})

const Trend = mongoose.model('trends', trendSchema);

module.exports = Trend;
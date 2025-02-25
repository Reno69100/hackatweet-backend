const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    date: { type:String, default:new Date(Date.now()).toISOString()},
    message: String,
    nbLike: {type:Number, default:0},
    trends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trends' }],
    

});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;
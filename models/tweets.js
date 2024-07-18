const mongoose = require('mongoose');

const trendSchema = mongoose.Schema({
    /* user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }, */
    date: Date,
    message: String,
    nbLike: Number,
    trends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trends' }],
    

});

const Trend = mongoose.model('Trend', trendSchema);
var express = require('express');
var router = express.Router();
const Trend = require('../models/trends')
const Tweet = require('../models/tweets')



//POST’/’ —> (token, date, message, [trend]) —> {result:true}
router.post('/', (req, res) =>{
    
})

//GET’/’ (trend)  —> {tweets}



module.exports = router;

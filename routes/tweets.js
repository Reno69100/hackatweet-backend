var express = require('express');
var router = express.Router();
<<<<<<< HEAD
=======
const Trend = require('../models/trends')
const Tweet = require('../models/tweets')



//POST’/’ —> (token, date, message, [trend]) —> {result:true}
router.post('/', (req, res) =>{
    
})

//GET’/’ (trend)  —> {tweets}

>>>>>>> 4193f14a9fc14df2a2a128af69373f64cc3b0370


module.exports = router;

var express = require('express');
var router = express.Router();
const Trend = require('../models/trends')
const Tweet = require('../models/tweets')



//POST’/’ —> (token, date, message, [trend]) —> {result:true}
router.post('/', (req, res) =>{
    
})

//GET’/’ (trend)  —> {tweets}
router.get("/", (req, res) => {
    Tweet.find()
    .then((data)=>{
      console.log(data);
      res.json({result:true})
    })
  });
  



module.exports = router;

var express = require('express');
var router = express.Router();
const Trend = require('../models/trends')

router.get("/", (req, res) => {
  Trend.find()
  .then((data)=>{
    console.log(data)
    res.json({result:true, trends:data})
  })
});

module.exports = router;

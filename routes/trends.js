var express = require('express');
var router = express.Router();
const Trend = require('../models/trends')

//get trends
router.get("/", (req, res) => {
  Trend.find()
    .then((data) => {
      console.log(data)
      res.json({ result: true, trends: data })
    })
});

//add trend
router.post("/:name", (req, res) => {
  Trend.findOne({ name: req.params.name })
    .then((data) => {
      if (!data) {
        const newTrend = new Trend({
          name: req.params.name,
          nbTweets: 1,
        })
        newTrend.save()
          .then((data) => {
            console.log(data)
            res.json({ result: true })
          })
      }
      else {
        Trend.updateOne({ name: req.params.name }, { $inc: { nbTweets: +1 } })
        .then((data) => {
          res.json({ result: true })
        })
      }
    })
})

module.exports = router;

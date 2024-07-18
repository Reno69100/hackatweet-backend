var express = require('express');
var router = express.Router();
const Tweet = require('../models/tweets')
const Trend = require('../models/trends')
const User = require('../models/users');

//POST’/’ —> (token, message, [trend]) —> {result:true}
router.post('/new/:token', async (req, res) => {
    const token = req.params.token;
    const { message, trends } = req.body;
    const trendsID = [];

    //Vérification autorisation user
    const user = await User.findOne({ token });
    if (!user) {
        res.json({ result: false, message: "User not connected." });
        return;
    }

    //Vérification si trend existe sinon création + mémorisation id
    for await (const element of trends.split(',')) {
        const trend = await Trend.findOne({ name: element.toLowerCase() });
        (trend) && console.log(trend._id);
        (trend) && trendsID.push(trend._id);
    }

    //Création nouveau tweet
    const newTweet = await new Tweet({
        message: message,
        user: user._id,
        trends: trendsID,
    });
    console.log(newTweet);
    newTweet.save()
        .then(data => {
            if (data) {
                res.json({ result: true });
            }
            else {
                res.json({ result: false, message: "New tweets error." });
            }
        })
})

//POST’/’ update nblike
router.post('/addlike', (req, res) => {
    Tweet.updateOne({ _id : req.body.id },{ $inc:{ nbLike : +1 }})
          .then((tweet) => {
            if (tweet) {
              res.json({ result: true });
            }
            else {
              res.json({ result: false, message: "Error" });
            }
          })
})

//GET’/’ (trend)  —> {tweets}
router.get("/", async (req, res) => {
    //Vérification si trend existe sinon création + mémorisation id
    const trend = await Trend.findOne({ name: req.body.trend });

    if (trend) {
        const trendID = trend._id;
        Tweet.find({ trends: { $elemMatch : { $eq: trendID } } })
        .populate('trends')
        .populate({ path: 'user', select: {'firstname':1, 'nickname':1}})
        .then((tweets) => {
            /* const dataTrend = data.filter(data => data.trends)
            console.log(dataTrend); */
            res.json({ result: true, tweets })
        })
    }
    else {
        res.json({ result: false, message : "No tweets for this trend"})
    }
});

module.exports = router;
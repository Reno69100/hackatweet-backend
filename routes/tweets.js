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
    console.log(trends);

    //Vérification autorisation user
    const user = await User.find({ token });
    if (!user) {
        res.json({ result: false, message: "User not connected." });
        return;
    }

    console.log(user._id);

    //Vérification si trend existe sinon création + mémorisation id
    for await (const element of trends) {
        const trend = await Trend.find({ name: element });
        if (trend.length === 0) {
            const newTrend = await new Trend({ name: element });
            console.log(element);
            const dataTrend = await newTrend.save();
            trendsID.push(dataTrend);
        }
    }

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

//GET’/’ (trend)  —> {tweets}
router.get("/", (req, res) => {
    Tweet.find()
        .populate('trends')
        .then((data) => {
            console.log(data);
            res.json({ result: true })
        })
});

module.exports = router;
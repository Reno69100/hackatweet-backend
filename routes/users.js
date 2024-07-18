var express = require('express');
var router = express.Router();
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

/* GET user information */
router.get('/:token', (req, res) => {
  const token = req.params.token;
  User.findOne({ token })
    .then(data => {
      if (data) {
        const dataUser = {
          firstname: data.firstname,
          nickname: data.nickname,
        };
        res.json({ result: true, user: dataUser });
      }
      else {
        res.json({ result: false, message: "User does not exist." });
      }
    })

});

/* Signup user */
router.post('/signup', (req, res) => {
  const { firstname, username, password } = req.body;

  User.findOne({ firstname, username })
    .then(data => {
      if (!data) {
        const newUser = new User({
          firstname: firstname,
          username: username,
          nickname: `@${firstname}${username}`,
          password: bcrypt.hashSync(password, 10),
          token: uid2(32),
        });
        newUser.save()
          .then((user) => {
            if (user) {
              res.json({ result: true, user });
            }
            else {
              res.json({ result: false, message: "Error create user." });
            }
          })
      }
      else {
        res.json({ result: false, message: "User already exists." });
      }
    })

});

module.exports = router;
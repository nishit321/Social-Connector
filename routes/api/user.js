const express = require("express");
const router = express.Router();
const user = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/keys");
const passport = require("passport");
// @route   GET api/users/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register
// @access  Public
router.post("/register", (req, res) => {
  user.findOne({ email: req.body.email }).then(doc => {
    if (doc) {
      return res.status(400).json({ email: "Email Already Exists" });
    } else {
      const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(users => res.json(users))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //Find User by email
  User.findOne({ email }).then(user => {
    //Check User
    if (!user) {
      return res.status(404).json({ email: "User Email Not Found" });
    }

    //Check Password
    bcryptjs.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Match
        const payload = {
          id: user._id,
          name: user.name
        };
        //Sign Token
        jwt.sign(
          payload,
          config.secretKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ token, sccess: true });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  }
);

module.exports = router;

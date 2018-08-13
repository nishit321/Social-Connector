const JWTStragegy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const user = mongoose.model("user");
const keys = require("../config/keys");

const opts = {};
opts.jwtFrommRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
  passport.use(
    new JWTStragegy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
    })
  );
};

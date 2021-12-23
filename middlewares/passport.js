// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
const debug = require('debug')('passport');
// require('dotenv').config();

const User = require('../models/user');

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    // debug('passport local');
    // console.log('passport local');
    try {
      const user = await User.findOne({ email });
      // console.log(user);
      if (!user) done(null, false, { title: 'error', message: 'invalid email or password' });

      const isVerified = await user.validatePassword(password);
      if (!isVerified) done(null, false, { title: 'error', message: 'invalid email or password' });

      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

const options = {};
options.secretOrKey = process.env.SECRET;
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(
  'jwt',
  new JwtStrategy(options, async function (jwt_payload, done) {
    // console.log('jwt strategy');
    try {
      const user = await User.findOne({ _id: jwt_payload._id });
      if (!user) done(null, false, { title: 'error', message: 'invalid token' });
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

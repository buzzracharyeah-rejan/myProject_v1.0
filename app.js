const express = require('express');
const dotenv = require('dotenv').config();
const passport = require('passport');

const server = require('./server');
const authRoute = require('./routes/authRoute');
const propertyRoute = require('./routes/propertyRoute');
const userRoute = require('./routes/userRoutes');
const commentRoute = require('./routes/commentRoute');

const app = express();

//midddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init passport;
app.use(passport.initialize());

// register routes
app.use(authRoute);
app.use(userRoute);
app.use(propertyRoute);
app.use(commentRoute);

app.listen(process.env.PORT, () => {
  server.main();
  console.log(`server started at port ${process.env.PORT}`);
});

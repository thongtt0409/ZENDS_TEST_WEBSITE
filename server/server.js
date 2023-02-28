const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const storyRoute = require('./src/routes/story.route');
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 8000;
app.set('trust proxy', 1)
app.use(cors({
  origin:["http://localhost:3000", "https://zens-front-end.onrender.com"],
  credentials: true
}));

app.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB connection Successfull!');
  })
  .catch((err) => console.log(err));

app.use(
  session({
    secret: 'keyboard cat',
    // store: new RedisStore({ client: clientRedis }),
    resave: false,
    saveUninitialized: true,
    proxy: true,
    name: 'MyCoolWebAppCookieName',
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 10 * 60 * 1000,
      sameSite: 'lax',
    },
  })
);
app.use(function (req, res, next) {
  const session = req.session;
  req.cookies.sessionID = session;
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/story', storyRoute);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

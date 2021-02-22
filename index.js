const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routers/user');
const signRouter = require('./routers/sign');
const questionRouter = require('./routers/question');
const avatarRouter = require('./routers/avatar');
const adminRouter = require('./routers/admin');

app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/user', userRouter);
app.use('/', signRouter);
app.use('/question', questionRouter);
app.use('/', avatarRouter);
app.use('/', adminRouter);

// Error middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log('<< 401 UNAUTHORIZED - Invalid Token');
    res.status(401).send('Invalid token');
  }
});
app.listen(process.env.PORT || 5000, () => {
  //console.log(`App running on port ${port}.`)
  console.log(`App running on port`)
})
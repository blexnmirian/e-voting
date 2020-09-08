const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
const poll = require('./router/poll')

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
dotenv.config({path: './config.env'})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//connecting to mongodb
mongoose.connect(process.env.DATABASE_REMOTE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, ()=>{
  console.log(`Db connected to ${process.env.DATABASE_LOCAL}`)
})

//enable cors
app.use(cors());
app.use('/poll', poll)

const port = 3000;
app.listen(port, ()=>{
  console.log(`Server started at port ${port}`)
})
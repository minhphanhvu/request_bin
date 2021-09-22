// server/index.js

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/request_bin`);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json())

require('../routes/binRoutes.js')(app)

app.get(`/*`, (req, res) => {
  console.log(req.params)
  console.log(req.headers)
  console.log(req.body)
  console.log("This is a get request")
  res.json({ message: "This is a get request" })
})

app.post(`/*`, (req, res) => {
  console.log(req.params)
  console.log(req.headers)
  console.log(req.body)
  console.log("This is a post request")
  res.json({ message: "This is a post request" })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
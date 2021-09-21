// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.post("/*", (req, res) => {
  console.log(req.params)
  console.log(req.headers)
  console.log(req.body)
  res.json({ message: "This is a post request" })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
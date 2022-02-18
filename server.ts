const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.listen(8000, () => {
  console.log("Express server is running on port 8000")
})
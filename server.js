const express = require("express");
const path = require("path");
const app = express();
//set port
var port = process.env.PORT || 9000;
app.use(express.static(path.join(__dirname, "client/build")));
//routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => {
  console.log("app running");
});

var express = require("express");
var app = express();

// sendFile method will set the appropriate headers to instruct your browser on how to handle the file you want to send
var static = express.static("public");

app.get("/", function (req, res) {
  let path = __dirname + "/views/index.html";
  res.sendFile(path);
});

//The endpoint /json should serve the json object {"message": "Hello json"}

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// serving static assets
app.use("/public", static);

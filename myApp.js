var express = require("express");
var app = express();

// sendFile method will set the appropriate headers to instruct your browser on how to handle the file you want to send
var static = express.static('public')

app.get('/',function(req,res){
  let path = __dirname + '/views/index.html'
  res.sendFile(path)
})

// serving static assets
app.use('/public',static)

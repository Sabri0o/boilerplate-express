var express = require("express");
var app = express();

// sendFile method will set the appropriate headers to instruct your browser on how to handle the file you want to send
var static = express.static("public");
//Build a simple logger. For every request, it should log to the console a string taking the following format: method path - ip
var simpleLogger = function (req, res, next) {
  //method path - ip
  console.log(req.method + " " + req.path + " " + "-" + " " + req.ip);
  next();
};
//mount a middleware function at root level, you can use the app.use(<mware-function>)
app.use(simpleLogger);

// serving static assets
app.use("/public", static);

app.get("/", function (req, res) {
  let path = __dirname + "/views/index.html";
  res.sendFile(path);
});

// In the route app.get('/now', ...) chain a middleware function and the final handler.
// In the middleware function you should add the current time to the request object in the req.time key.
// You can use new Date().toString(). In the handler, respond with a JSON object, taking the structure {time: req.time}.
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

//Build an echo server, mounted at the route GET /:word/echo.
// Respond with a JSON object, taking the structure {echo: word}.
// You can find the word to be repeated at req.params.word.
app.get('/:word/echo',function(req,res){
    res.json({echo: req.params.word})
  })

//The endpoint /json should serve the json object {"message": "Hello json"}

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

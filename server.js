
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", function (req, res) {
  const date = new Date();
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

app.get("/api/timestamp/:date_string", function (req, res) {
const date_string = req.params.date_string;
if (isNaN(date_string)) {
    const date = new Date(date_string );
    if (date) {
      var dt = new Date(date_string);
      res.json({"unix": dt.getTime(), "utc": dt.toUTCString()});
    } else {
      console.log(req.params.date_string);
      res.json({"unix": null, "utc": 'Invalid Date'});
    }
} else {
    const date = new Date(Number(date_string));
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
}
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
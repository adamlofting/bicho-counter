var express = require("express");
var util = require("./lib/util");
var data = require("./lib/data");
var helmet = require('helmet');

var app = express();

app.use(express.favicon());
app.use(express.urlencoded());

// some default security things
app.use(helmet.hsts()); // HTTP Strict Transport Security
app.use(helmet.xframe('deny')); // X-Frame-Options
app.use(helmet.csp());
app.use(helmet.iexss());
app.use(helmet.contentTypeOptions());
app.use(helmet.hidePoweredBy());

app.use(app.router);

// Routes
app.get('/', function (req, res) {
  // var team = req.query.team;
  // if (!team) {
  //   res.end('Missing parameter: "team". E.g. mofo-webmaker, moco-engagement');
  //   return;
  // }

  var date = util.parseAndCheckDate(req.query.date);
  if (!date) {
    res.end('Missing parameter: "date". Must be in this format: YYYY-MM-DD.');
    return;
  }

  data.getContributorCounts(date, function gotCounts(err, result) {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

// Run the server
var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
  console.log("Listening on " + port);
});

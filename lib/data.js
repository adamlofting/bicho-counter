// var mysql = require('mysql');
// var async = require('async');
// var util = require("../lib/util.js");

var connectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

if (process.env.DB_SSL) {
  // SSL is used for Amazon RDS, but not necessarily for local dev
  connectionOptions.ssl = process.env.DB_SSL;
}

exports.getContributorCounts = function getContributorCounts(date, teamname, callback) {
  var counts = {};

  counts = {
    "hello": "world"
  };
  callback(null, counts);

  // var connection = mysql.createConnection(connectionOptions);
  // connection.connect(function connectionAttempted(err) {

  //   if (err) {
  //     console.log(err);
  //     callback(null, null);
  //   } else {

  //     var queryDate = new Date(date);
  //     queryDate.setHours(0, 0, 0, 0);

  //     var weekPrior = new Date(queryDate);
  //     weekPrior.setDate(queryDate.getDate() - 7);

  //     var yearPrior = new Date(queryDate);
  //     yearPrior.setFullYear(yearPrior.getFullYear() - 1);

  //     // format these for query
  //     queryDate = util.dateToISOtring(queryDate);
  //     weekPrior = util.dateToISOtring(weekPrior);
  //     yearPrior = util.dateToISOtring(yearPrior);

  //     async.parallel({
  //         last_year: function (callback) {
  //           /*jshint multistr: true */
  //           var query = 'SELECT DISTINCT contributor_id FROM contributions WHERE \
  //                       contribution_date <= ? \
  //                       AND contribution_date > ? \
  //                       AND moz_team = ? \
  //                       AND data_bucket IN (?);';
  //           var values = [queryDate, yearPrior, teamname, dataBucket];
  //           connection.query(query, values,
  //             function queryComplete(err, result) {
  //               if (err) {
  //                 console.log(err);
  //               }
  //               callback(null, result);
  //             });
  //         },
  //         last_week: function (callback) {
  //           /*jshint multistr: true */
  //           var query = 'SELECT DISTINCT contributor_id FROM contributions WHERE \
  //                       contribution_date <= ? \
  //                       AND contribution_date > ? \
  //                       AND moz_team = ? \
  //                       AND data_bucket IN (?);';
  //           var values = [queryDate, weekPrior, teamname, dataBucket];
  //           connection.query(query, values,
  //             function queryComplete(err, result) {
  //               if (err) {
  //                 console.log(err);
  //               }
  //               callback(null, result);
  //             });
  //         },
  //         last_year_excluding_last_week: function (callback) {
  //           /*jshint multistr: true */
  //           var query = 'SELECT DISTINCT contributor_id FROM contributions WHERE \
  //                       contribution_date <= ? \
  //                       AND contribution_date > ? \
  //                       AND moz_team = ? \
  //                       AND data_bucket IN (?);';
  //           var values = [weekPrior, yearPrior, teamname, dataBucket];
  //           connection.query(query, values,
  //             function queryComplete(err, result) {
  //               if (err) {
  //                 console.log(err);
  //               }
  //               callback(null, result);
  //             }
  //           );
  //         }
  //       },
  //       function (err, results) {
  //         var namesYear = util.fieldToArray(results.last_year, "contributor_id");
  //         var namesWeek = util.fieldToArray(results.last_week, "contributor_id");
  //         var namesYearExWeek = util.fieldToArray(results.last_year_excluding_last_week, "contributor_id");

  //         counts.total_active_contributors = namesYear.length;
  //         counts.new_contributors_7_days = util.countInAnotInB(namesWeek, namesYearExWeek);

  //         connection.end();
  //         callback(null, counts);
  //       });
  //   }
  // });
};

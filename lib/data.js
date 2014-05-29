var mysql = require('mysql');
var async = require('async');
var util = require("../lib/util.js");

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

function parseContributorList(results) {
  var arr = [];
  for (var i = results.length - 1; i >= 0; i--) {
    arr.push(results[i].user_id);
  }
  arr = util.removeMozillaStaffEmails(arr);
  return arr;
}

exports.getContributorCounts = function getContributorCounts(date, teamname, callback) {
  var counts = {};

  var queryDate = new Date(date);
  queryDate.setHours(0, 0, 0, 0);

  var weekPrior = new Date(queryDate);
  weekPrior.setDate(queryDate.getDate() - 7);

  var yearPrior = new Date(queryDate);
  yearPrior.setFullYear(yearPrior.getFullYear() - 1);

  /*jshint multistr: true */
  var query = 'SELECT DISTINCT people.user_id \
                FROM comments, people \
                WHERE comments.submitted_by = people.id \
                AND comments.submitted_on BETWEEN ? AND ? \
              \
              UNION \
              \
              SELECT DISTINCT people.user_id \
                FROM issues, people \
                WHERE issues.submitted_by = people.id \
                AND issues.submitted_on BETWEEN ? AND ?;';

  var connection = mysql.createConnection(connectionOptions);
  async.parallel({
      last_year: function (callback) {
        var values = [yearPrior, queryDate, yearPrior, queryDate];
        connection.query(query, values,
          function queryComplete(err, result) {
            if (err) {
              console.log(err);
            }
            callback(null, result);
          });
      },
      last_week: function (callback) {
        var values = [weekPrior, queryDate, weekPrior, queryDate];
        connection.query(query, values,
          function queryComplete(err, result) {
            if (err) {
              console.log(err);
            }
            callback(null, result);
          });
      },
      last_year_excluding_last_week: function (callback) {
        var values = [yearPrior, weekPrior, yearPrior, weekPrior];
        connection.query(query, values,
          function queryComplete(err, result) {
            if (err) {
              console.log(err);
            }
            callback(null, result);
          }
        );
      }
    },
    function (err, results) {
      var namesYear = parseContributorList(results.last_year);
      var namesWeek = parseContributorList(results.last_week);
      var namesYearExWeek = parseContributorList(results.last_year_excluding_last_week);

      counts.total_active_contributors = namesYear.length;
      counts.new_contributors_7_days = util.countInAnotInB(namesWeek, namesYearExWeek);

      connection.end();
      callback(null, counts);
    });

};

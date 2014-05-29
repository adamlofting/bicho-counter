/**
 * parse a string to a Date, and check it's a valid date
 * @param  {str} str
 * @return {Date}
 */
function parseAndCheckDate(str) {
  var date;
  date = new Date(str);
  if (Object.prototype.toString.call(date) === "[object Date]") {
    if (isNaN(date.getTime())) {
      return null;
    }
    if (date.getFullYear() > 2025) {
      return null;
    }
  } else {
    return null;
  }
  return date;
}

module.exports = {
  parseAndCheckDate: parseAndCheckDate,
};

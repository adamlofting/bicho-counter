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

/**
 * Counts occurances in Array A that are not in Array B
 * @param  {Array} arrA
 * @param  {Array} arrB
 * @return {Int}
 */
function countInAnotInB(arrA, arrB) {
  var count = 0;
  for (var i = 0; i < arrA.length; i++) {
    if (arrB.indexOf(arrA[i]) === -1) {
      count++;
    }
  }
  return count;
}

/**
 * Remove any strings that look like mozilla staff email addresses from array
 * @param  {Array} arr
 * @return {Array}
 */
function removeMozillaStaffEmails(arr) {
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    if (!arr[i].match(/@(mozillafoundation.org|mozilla.com)$/)) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
}

module.exports = {
  parseAndCheckDate: parseAndCheckDate,
  removeMozillaStaffEmails: removeMozillaStaffEmails,
  countInAnotInB: countInAnotInB,
};

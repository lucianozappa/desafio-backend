var moment = require('moment');

function getTime(isotime) {
  var t = moment(isotime);
  var h = t.hours();
  var m = t.minutes();
  var s = t.seconds();

  var mengenlehreuhrFormat = {};
  mengenlehreuhrFormat.seconds = (s % 2 === 1);
  mengenlehreuhrFormat.hours1 = h % 5;
  mengenlehreuhrFormat.hours5 = (h - mengenlehreuhrFormat.hours1) / 5;
  mengenlehreuhrFormat.minutes1 = m % 5;
  mengenlehreuhrFormat.minutes5 = (m - mengenlehreuhrFormat.minutes1) / 5;

  return mengenlehreuhrFormat;
};

module.exports = {
  getTime: getTime
};

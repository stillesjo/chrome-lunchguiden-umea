'use strict';

/*@ngInject*/
(function() {


angular.module('playground').factory('date', function($translate) {
  // return [{ date: new Date().toLocaleDateString(), day: getDayName(new Date().getDay()) }];
  return getSevenDays();

})

function getSevenDays() {
  // var tempDate = new Date();
  // var date = new Date();
  // date.setDate(tempDate.getDate()-1);
  //
  // return _.map([0, 1, 2, 3, 4, 5, 6], function (x) {
  //   var theDate = new Date();
  //   date = nextWeekDay(date);
  //   return {date: date.toLocaleDateString(), day: getDayName(date.getDay()) };
  // });
  var date = moment();
  var dates = [];
  for (var i = 0; dates.length < 7; ++i) {
    var dayOfWeek = date.day();
    if (dayOfWeek > 0 && dayOfWeek < 6) {
      dates.push(moment(date));
    }
    date.add(1, 'd');
  }
  return dates;
};
}());

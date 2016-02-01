'use strict';
/* global moment */
/* global angular */

/*@ngInject*/
(function() {

angular.module('playground').factory('date', function() {
  return getSevenDays();

});

function getSevenDays() {
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

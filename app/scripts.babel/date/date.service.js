'use strict';
/* global moment */
/* global angular */

/*@ngInject*/
(function() {

angular.module('lunchguideUmea').factory('date', function() {
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
});

}());

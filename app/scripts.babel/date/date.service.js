'use strict';

/*@ngInject*/
angular.module('playground').factory('date', function($translate) {
  return getSevenDays();

  function getSevenDays() {
    var tempDate = new Date();
    var date = new Date();
    date.setDate(tempDate.getDate()-1);
    
    return _.map([0, 1, 2, 3, 4, 5, 6], function (x) {
      var theDate = new Date();
      date = nextWeekDay(date);
      return {date: date.toLocaleDateString(), day: getDayName(date.getDay()) };
    });

  };
  function nextWeekDay(date) {
    // Skip 3 days if friday, otherwise 1
    var skipDays = date.getDay() === 5 ? 3 : 1;
    var future = new Date();
    future.setDate(date.getDate() + skipDays);
    return future;
  }
  function getDayName(day) {
    switch (day) {
      case 1:
        return $translate.instant('Monday');
        break;
      case 2:
        return $translate.instant('Tuesday');
        break;
      case 3:
        return $translate.instant('Wednesday');
        break;
      case 4:
        return $translate.instant('Thursday');
        break;
      case 5:
        return $translate.instant('Friday');
        break;
    }
  }
})
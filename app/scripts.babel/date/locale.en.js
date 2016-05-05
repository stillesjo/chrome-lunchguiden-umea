//! moment.js locale configuration
//! locale : swedish (sv)
//! author : Jens Alm : https://github.com/ulmus
//! modified by : Alexander Stillesjo : https://github.com/stillesjo
'use strict';

angular.module('lunchguideUmea').config(function() {

    moment.defineLocale('en', {
      calendar: {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          lastDay: '[Yesterday]',
          nextWeek: 'dddd',
          lastWeek: '[Last] dddd[s]',
          sameElse: 'L'
      },
    });
})

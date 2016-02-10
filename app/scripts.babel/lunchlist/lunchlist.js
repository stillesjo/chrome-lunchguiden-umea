'use strict';

/* @ngInject */
angular.module('playground').config(function($stateProvider) {
    $stateProvider.state('lunchlist', {
        url: '/?date',
        templateUrl: chrome.extension.getURL('scripts/lunchlist/lunchlist.html'),
        controller: 'LunchlistController',
        resolve: {
            /* @ngInject */
            restaurants: function(restaurant, $stateParams, date) {
              var d = $stateParams.date || date[0].format('L');
              return restaurant.get({datum: d});
            }
        }
    })
});

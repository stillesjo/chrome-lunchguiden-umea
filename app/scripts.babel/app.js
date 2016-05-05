'use strict';
/*@ngInject*/
/* global angular */
/*eslint semi: 2*/

angular.module('lunchguideUmea', [
  'ui.router',
  'ngResource',
  'ngMaterial',
])
.config(function($urlRouterProvider) {
  $urlRouterProvider
  .otherwise('/');
})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('red');
})
.filter('splitnewline', function() {
  return function(input) {
    return input
      .replace(/<br>/g, '')
      .split('\r\n')
      .filter(Boolean);
  };
});
